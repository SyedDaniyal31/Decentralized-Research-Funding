const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DRFToken
  const DRFToken = await ethers.getContractFactory("DRFToken");
  const drfToken = await DRFToken.deploy();
  await drfToken.deployed();
  console.log("DRFToken deployed to:", drfToken.address);

  // Deploy ResearchDAO
  const ResearchDAO = await ethers.getContractFactory("ResearchDAO");
  const researchDAO = await ResearchDAO.deploy(drfToken.address);
  await researchDAO.deployed();
  console.log("ResearchDAO deployed to:", researchDAO.address);

  // Deploy MilestoneFunding
  const MilestoneFunding = await ethers.getContractFactory("MilestoneFunding");
  const milestoneFunding = await MilestoneFunding.deploy(researchDAO.address);
  await milestoneFunding.deployed();
  console.log("MilestoneFunding deployed to:", milestoneFunding.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
