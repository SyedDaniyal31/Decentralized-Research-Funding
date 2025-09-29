// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IResearchDAO {
    function proposals(uint256) external view returns (
        uint256 id,
        address proposer,
        string memory ipfsHash,
        uint256 fundingAmount,
        uint256 milestoneCount,
        uint256 startTime,
        uint256 endTime,
        uint256 yesVotes,
        uint256 noVotes,
        bool executed
    );
}

contract MilestoneFunding is ReentrancyGuard, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    IResearchDAO public researchDAO;
    uint256 public lockedFunds;
    bool public paused;

    struct Milestone {
        string ipfsProof;
        bool approved;
    }

    struct Funding {
        uint256 proposalId;
        address researcher;
        uint256 totalAmount;
        uint256 releasedAmount;
        uint256 milestoneCount;
        uint256 currentMilestone;
        mapping(uint256 => Milestone) milestones;
    }

    mapping(uint256 => Funding) public fundings;

    event FundsLocked(uint256 indexed proposalId, address indexed researcher, uint256 amount);
    event MilestoneSubmitted(uint256 indexed proposalId, uint256 milestoneIndex, string ipfsProof);
    event MilestoneApproved(uint256 indexed proposalId, uint256 milestoneIndex, uint256 amountReleased);
    event Paused();
    event Unpaused();

    modifier notPaused() {
        require(!paused, "Paused");
        _;
    }

    constructor(address _researchDAO) {
        researchDAO = IResearchDAO(_researchDAO);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function lockFunds(uint256 proposalId, address researcher, uint256 amount, uint256 milestoneCount) external onlyRole(ADMIN_ROLE) notPaused {
        Funding storage f = fundings[proposalId];
        require(f.totalAmount == 0, "Already funded");
        f.proposalId = proposalId;
        f.researcher = researcher;
        f.totalAmount = amount;
        f.milestoneCount = milestoneCount;
        f.currentMilestone = 0;
        lockedFunds += amount;
        emit FundsLocked(proposalId, researcher, amount);
    }

    function submitMilestone(uint256 proposalId, string memory ipfsProof) external notPaused {
        Funding storage f = fundings[proposalId];
        require(msg.sender == f.researcher, "Not researcher");
        require(f.currentMilestone < f.milestoneCount, "All milestones submitted");
        f.milestones[f.currentMilestone].ipfsProof = ipfsProof;
        emit MilestoneSubmitted(proposalId, f.currentMilestone, ipfsProof);
    }

    function approveMilestone(uint256 proposalId, uint256 milestoneIndex, uint256 amount) external onlyRole(ADMIN_ROLE) notPaused nonReentrant {
        Funding storage f = fundings[proposalId];
        require(!f.milestones[milestoneIndex].approved, "Already approved");
        require(f.releasedAmount + amount <= f.totalAmount, "Exceeds total");
        f.milestones[milestoneIndex].approved = true;
        f.releasedAmount += amount;
        f.currentMilestone++;
        lockedFunds -= amount;
        payable(f.researcher).transfer(amount);
        emit MilestoneApproved(proposalId, milestoneIndex, amount);
    }

    function pause() external onlyRole(ADMIN_ROLE) {
        paused = true;
        emit Paused();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        paused = false;
        emit Unpaused();
    }

    // Fallback to receive ETH
    receive() external payable {}
}
