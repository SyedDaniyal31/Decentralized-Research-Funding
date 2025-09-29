const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DRFToken", function () {
  let token, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const DRFToken = await ethers.getContractFactory("DRFToken");
    token = await DRFToken.deploy();
    await token.deployed();
  });

  it("should mint initial supply to owner", async function () {
    expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("should allow minter to mint", async function () {
    await token.mint(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });

  it("should not allow non-minter to mint", async function () {
    await expect(token.connect(addr1).mint(addr1.address, 1000)).to.be.reverted;
  });

  it("should delegate votes", async function () {
    await token.delegate(owner.address);
    expect(await token.getVotes(owner.address)).to.equal(ethers.utils.parseEther("1000000"));
  });
});
