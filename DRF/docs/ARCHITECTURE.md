# DRF Platform Architecture

## Overview
- Monorepo: frontend (Next.js), backend (Express/Prisma), contracts (Solidity/Hardhat)
- IPFS for document storage, KYC provider for identity
- DAO voting and milestone-based funding via smart contracts

## Data Flow
- Researcher submits proposal (IPFS upload, backend, blockchain)
- Investors vote via DAO contract
- Milestone proofs uploaded to IPFS, funding released on-chain

## Security
- JWT auth, role-based access, signature verification
- Reentrancy guards, access control in contracts
- .env for secrets, Docker for local dev

## Diagrams
- See MVP sequence diagram in README
