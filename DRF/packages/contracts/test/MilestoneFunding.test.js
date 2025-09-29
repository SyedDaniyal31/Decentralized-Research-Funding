const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MilestoneFunding", function () {
  let token, dao, funding, owner, researcher;

  beforeEach(async function () {
    [owner, researcher] = await ethers.getSigners();
    const DRFToken = await ethers.getContractFactory("DRFToken");
    token = await DRFToken.deploy();
    await token.deployed();
    const ResearchDAO = await ethers.getContractFactory("ResearchDAO");
    dao = await ResearchDAO.deploy(token.address);
    await dao.deployed();
    const MilestoneFunding = await ethers.getContractFactory("MilestoneFunding");
    funding = await MilestoneFunding.deploy(dao.address);
    await funding.deployed();
  });

  it("should lock funds for a proposal", async function () {
    await funding.lockFunds(1, researcher.address, 1000, 3);
    const f = await funding.fundings(1);
    expect(f.totalAmount).to.equal(1000);
  });

  it("should submit and approve milestone", async function () {
    await funding.lockFunds(1, researcher.address, 1000, 2);
    await funding.connect(researcher).submitMilestone(1, "QmProof");
    await funding.approveMilestone(1, 0, 500);
    const f = await funding.fundings(1);
    expect(f.releasedAmount).to.equal(500);
  });

  it("should prevent reentrancy and unauthorized access", async function () {
    await funding.lockFunds(1, researcher.address, 1000, 1);
    await expect(funding.connect(researcher).approveMilestone(1, 0, 1000)).to.be.reverted;
  });
});
