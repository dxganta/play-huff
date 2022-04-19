const { expect } = require("chai");
const { ethers } = require("hardhat");

let sm;

const uintMax =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

describe("SafeMath", function () {
  beforeEach(async function () {
    const SM = await ethers.getContractFactory("SafeMath");
    sm = await SM.deploy();
    await sm.deployed();
  });
  it("SafeMath is deployed", async function () {
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

  it("SafeMultipy Test", async function () {
    const val = await sm.safeMul(5, 6);
    expect(val).to.equal(30);

    // must revert if overflow
    await expect(sm.safeMul(uintMax, 2)).to.be.reverted;
  });

  it("SafeDiv Test", async function () {
    const val = await sm.safeDiv(100, 2);
    expect(val).to.equal(50);

    // must revert if division by zero
    await expect(sm.safeDiv(100, 0)).to.be.reverted;
  });
});
