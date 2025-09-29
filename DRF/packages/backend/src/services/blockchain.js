const { ethers } = require('ethers');
const DRFTokenABI = require('../../../packages/contracts/artifacts/contracts/DRFToken.sol/DRFToken.json').abi;
const ResearchDAOABI = require('../../../packages/contracts/artifacts/contracts/ResearchDAO.sol/ResearchDAO.json').abi;
const MilestoneFundingABI = require('../../../packages/contracts/artifacts/contracts/MilestoneFunding.sol/MilestoneFunding.json').abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const DRFToken = new ethers.Contract(process.env.DRF_TOKEN_ADDRESS, DRFTokenABI, wallet);
const ResearchDAO = new ethers.Contract(process.env.RESEARCH_DAO_ADDRESS, ResearchDAOABI, wallet);
const MilestoneFunding = new ethers.Contract(process.env.MILESTONE_FUNDING_ADDRESS, MilestoneFundingABI, wallet);

async function submitProposal(ipfsHash, fundingAmount, milestoneCount, proposer) {
  // Call ResearchDAO contract
  return ResearchDAO.submitProposal(ipfsHash, fundingAmount, milestoneCount);
}

async function submitMilestone(proposalId, ipfsProof, researcher) {
  // Call MilestoneFunding contract
  return MilestoneFunding.submitMilestone(proposalId, ipfsProof);
}

module.exports = { submitProposal, submitMilestone };
