# Decentralized Research Funding (DRF) Platform

A full-stack Web3 platform for decentralized, milestone-based research funding. Built with Next.js, Solidity, Node.js, and IPFS. Features researcher KYC, DAO voting, milestone escrow, and transparent funding workflows.

## MVP Overview
- Researcher onboarding & KYC
- Proposal submission (IPFS storage)
- DAO voting (ERC-20 governance)
- Milestone-based funding release
- Proof of research uploads

## Prerequisites
- Node.js >= 18.x
- Yarn >= 1.22
- MetaMask (Goerli/Sepolia)
- Docker (for local DB/IPFS)

## Quick Start
```sh
yarn install
yarn dev
```

## Project Structure
- `packages/frontend` – Next.js React app
- `packages/backend` – Node.js/Express API, Prisma ORM
- `packages/contracts` – Solidity smart contracts (Hardhat)
- `docs/` – API, deployment, and architecture docs

## Deployment
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for testnet and production deployment instructions.

## Contributing
See individual package READMEs for local development and contribution guidelines.
