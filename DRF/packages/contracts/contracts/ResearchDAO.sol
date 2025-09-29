// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract ResearchDAO is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    ERC20Votes public drfToken;
    uint256 public proposalCount;
    uint256 public votingPeriod = 3 days;
    uint256 public quorum = 1000 ether; // Example quorum

    struct Proposal {
        uint256 id;
        address proposer;
        string ipfsHash;
        uint256 fundingAmount;
        uint256 milestoneCount;
        uint256 startTime;
        uint256 endTime;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalSubmitted(uint256 indexed id, address indexed proposer, string ipfsHash, uint256 fundingAmount, uint256 milestoneCount);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor(address _drfToken) {
        drfToken = ERC20Votes(_drfToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function submitProposal(string memory ipfsHash, uint256 fundingAmount, uint256 milestoneCount) external returns (uint256) {
        proposalCount++;
        Proposal storage p = proposals[proposalCount];
        p.id = proposalCount;
        p.proposer = msg.sender;
        p.ipfsHash = ipfsHash;
        p.fundingAmount = fundingAmount;
        p.milestoneCount = milestoneCount;
        p.startTime = block.timestamp;
        p.endTime = block.timestamp + votingPeriod;
        emit ProposalSubmitted(proposalCount, msg.sender, ipfsHash, fundingAmount, milestoneCount);
        return proposalCount;
    }

    function vote(uint256 proposalId, bool support) external {
        Proposal storage p = proposals[proposalId];
        require(block.timestamp >= p.startTime && block.timestamp <= p.endTime, "Voting closed");
        require(!p.hasVoted[msg.sender], "Already voted");
        uint256 weight = drfToken.getVotes(msg.sender);
        require(weight > 0, "No voting power");
        p.hasVoted[msg.sender] = true;
        if (support) {
            p.yesVotes += weight;
        } else {
            p.noVotes += weight;
        }
        emit Voted(proposalId, msg.sender, support, weight);
    }

    function executeProposal(uint256 proposalId) external onlyRole(ADMIN_ROLE) {
        Proposal storage p = proposals[proposalId];
        require(!p.executed, "Already executed");
        require(block.timestamp > p.endTime, "Voting not ended");
        require(p.yesVotes >= quorum, "Quorum not met");
        p.executed = true;
        emit ProposalExecuted(proposalId);
        // Funding logic handled by MilestoneFunding contract
    }

    function getProposal(uint256 proposalId) external view returns (
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
    ) {
        Proposal storage p = proposals[proposalId];
        return (
            p.id,
            p.proposer,
            p.ipfsHash,
            p.fundingAmount,
            p.milestoneCount,
            p.startTime,
            p.endTime,
            p.yesVotes,
            p.noVotes,
            p.executed
        );
    }
}
