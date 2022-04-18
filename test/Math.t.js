const { expect } = require("chai");
const { ethers } = require("hardhat");

let math;

describe("Math", function () {
  beforeEach(async function () {
    const Math = await ethers.getContractFactory("Math");
    math = await Math.deploy();
    await math.deployed();
  });
  it("Math is deployed", async function () {
    expect(math.address).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
  it("Addition success", async function () {
    const val = await math.add(100, 69);
    expect(val).to.equal(169);
  });

  it("Minus success", async function () {
    const val = await math.minus(20, 100);
    expect(val).to.equal(80);
  });
});
