# Decentralized-Research-Funding
DRF is a blockchain-based fundraising platform designed to revolutionize scientific research funding. It connects investors, researchers, and advisors through a transparent, secure, and decentralized ecosystem powered by Ethereum smart contracts.
# 🧪 DRF – Decentralized Research Funding Platform

**DRF (Decentralized Research Funding)** is a blockchain-based platform that connects **investors, researchers, advisors, and admins** to fund and manage research projects in **Human, Animal, and Agricultural disease research**.
It ensures **transparency, trust, and accountability** through DAO governance, milestone-based funding, and blockchain verification.

---

## ✨ Features

* 🔹 **DAO Governance** – Investors vote on which projects get funded.
* 🔹 **Milestone-Based Funding** – Funds are released only when research milestones are met.
* 🔹 **Proof-of-Research (PoR)** – Researchers upload progress to IPFS for transparency.
* 🔹 **KYC Integration** – Researchers and investors are verified before participation.
* 🔹 **Project-Specific Tokens** – Custom tokens for each funded project.
* 🔹 **Cross-Sector Research** – Focus on Human, Animal, and Agricultural diseases.

---

## 📂 Project Structure

```
drf-platform/
│── packages/
│   ├── frontend/   # Next.js/React UI
│   ├── backend/    # Node.js/Express API + DB
│   ├── contracts/  # Smart contracts (Solidity, Hardhat)
│
│── docker-compose.yml  # Services (DB, Redis, IPFS)
│── .env.example        # Environment variables
│── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS)
* [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/)
* Blockchain RPC (Sepolia/Goerli via [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/))
* API keys (Etherscan, IPFS, KYC provider)

### Setup

```bash
# Clone repo
git clone https://github.com/yourusername/drf-platform.git
cd drf-platform

# Install dependencies
yarn install

# Copy env variables
cp .env.example .env
```

### Run Services

```bash
docker-compose up -d
```

### Backend Setup

```bash
cd packages/backend
yarn migrate
yarn generate
yarn dev
```

### Deploy Contracts

```bash
cd packages/contracts
yarn deploy:sepolia
```

### Frontend

```bash
cd packages/frontend
yarn dev
```

👉 Open: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

* **Frontend**: Next.js, React, TailwindCSS
* **Backend**: Node.js, Express, PostgreSQL, Redis
* **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
* **Storage**: IPFS for PoR documents
* **Blockchain**: Ethereum (Sepolia/Goerli testnets)
* **KYC**: Third-party provider (Persona/Sumsub API)

---

## 🧩 Actors & Roles

* **Investors**: Fund projects, vote, stake tokens, dispute resolution.
* **Researchers**: Submit proposals, upload PoR, request milestone unlocks.
* **Admins**: Approve KYC, monitor disputes, oversee system health.
* **Advisors**: Review proposals, provide expert guidance.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions from the community!

* Fork the repo
* Create a feature branch
* Submit a pull request

---

## 🌍 Vision

To create a **trustless, transparent, and decentralized funding ecosystem** that accelerates breakthroughs in **human, animal, and agricultural research**.

---
