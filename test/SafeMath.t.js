const { expect } = require("chai");
const { ethers } = require("hardhat");

let sm;

let uintMax;

describe("Math", function () {
  beforeEach(async function () {
    const SM = await ethers.getContractFactory("SafeMath");
    sm = await SM.deploy();
    await sm.deployed();
  });
  it("Math is deployed", async function () {
    expect(sm.address).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
  it("SafeAddition Test", async function () {
    const val = await sm.safeAdd(100, 69);
    expect(val).to.equal(169);

    // must revert if overflow
    await expect(sm.safeAdd(uintMax, 1)).to.be.reverted;
  });

  it("SafeMinus Test", async function () {
    const val = await sm.safeMinus(120, 100);
    expect(val).to.equal(20);

    // must revert if underflow
    await expect(sm.safeMinus(20, 100)).to.be.reverted;
  });
});
