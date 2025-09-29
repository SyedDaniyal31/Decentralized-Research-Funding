# DRF Platform Deployment Guide

## Prerequisites
- Node.js, Yarn, Docker
- Blockchain RPC endpoints (Goerli/Sepolia)
- Etherscan, KYC, and IPFS API keys

## Steps
1. Clone repo & copy `.env.example` to `.env`
2. `yarn install` (root)
3. `docker-compose up -d` (start DB, Redis, IPFS)
4. `cd packages/backend && yarn migrate && yarn generate`
5. Deploy contracts: `cd packages/contracts && yarn deploy:goerli`
6. Update contract addresses in `.env` and frontend constants
7. `cd packages/backend && yarn dev` (start API)
8. `cd packages/frontend && yarn dev` (start frontend)

## Production
- Use managed DB, secure secrets, HTTPS, and production build scripts.
- See contract verification and frontend static export for deployment.
