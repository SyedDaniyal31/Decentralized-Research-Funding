const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ResearchDAO", function () {
  let token, dao, owner, researcher, voter;

  beforeEach(async function () {
    [owner, researcher, voter] = await ethers.getSigners();
    const DRFToken = await ethers.getContractFactory("DRFToken");
    token = await DRFToken.deploy();
    await token.deployed();
    const ResearchDAO = await ethers.getContractFactory("ResearchDAO");
    dao = await ResearchDAO.deploy(token.address);
    await dao.deployed();
    await token.mint(voter.address, ethers.utils.parseEther("1000"));
    await token.connect(voter).delegate(voter.address);
  });

  it("should allow proposal submission", async function () {
    await expect(dao.connect(researcher).submitProposal("QmHash", 1000, 3)).to.emit(dao, "ProposalSubmitted");
  });

  it("should allow voting and execute proposal", async function () {
    await dao.connect(researcher).submitProposal("QmHash", 1000, 3);
    await dao.connect(voter).vote(1, true);
    // Fast-forward time
    await ethers.provider.send("evm_increaseTime", [4 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");
    await expect(dao.executeProposal(1)).to.be.revertedWith("Quorum not met");
  });

  it("should not allow double voting", async function () {
    await dao.connect(researcher).submitProposal("QmHash", 1000, 3);
    await dao.connect(voter).vote(1, true);
    await expect(dao.connect(voter).vote(1, false)).to.be.revertedWith("Already voted");
  });
});
