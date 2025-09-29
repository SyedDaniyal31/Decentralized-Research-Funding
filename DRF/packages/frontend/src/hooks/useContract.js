import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { DRF_TOKEN_ADDRESS, RESEARCH_DAO_ADDRESS, MILESTONE_FUNDING_ADDRESS, DRFTokenABI, ResearchDAOABI, MilestoneFundingABI } from '../utils/constants';

export function useDRFToken() {
  return {
    address: DRF_TOKEN_ADDRESS,
    abi: DRFTokenABI,
  };
}

export function useResearchDAO() {
  return {
    address: RESEARCH_DAO_ADDRESS,
    abi: ResearchDAOABI,
  };
}

export function useMilestoneFunding() {
  return {
    address: MILESTONE_FUNDING_ADDRESS,
    abi: MilestoneFundingABI,
  };
}

// Add more hooks for contract interactions as needed
