// Contract addresses, ABIs, network config, API endpoints
export const DRF_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_DRF_TOKEN_ADDRESS;
export const RESEARCH_DAO_ADDRESS = process.env.NEXT_PUBLIC_RESEARCH_DAO_ADDRESS;
export const MILESTONE_FUNDING_ADDRESS = process.env.NEXT_PUBLIC_MILESTONE_FUNDING_ADDRESS;

export { default as DRFTokenABI } from '../../../contracts/artifacts/contracts/DRFToken.sol/DRFToken.json';
export { default as ResearchDAOABI } from '../../../contracts/artifacts/contracts/ResearchDAO.sol/ResearchDAO.json';
export { default as MilestoneFundingABI } from '../../../contracts/artifacts/contracts/MilestoneFunding.sol/MilestoneFunding.json';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const USER_ROLES = ['RESEARCHER', 'INVESTOR', 'ADMIN'];
export const PROPOSAL_STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'FUNDED', 'COMPLETED'];
