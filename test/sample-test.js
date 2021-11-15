const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("Deployed contract and transfer", async function () {
    // Deploy Token contract
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();
    console.log("Token deployed to:", token.address);
    const owner = await token.owner();
    console.log("Token owner:", owner);

    let balance = await token.balanceOf(owner);
    expect(balance.toString()).to.equal("1000000");

    const dest = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
    const transferTx = await token.transfer(dest, 1000000);
    await transferTx.wait();
    
    balance = await token.balanceOf(dest);
    expect(balance.toString()).to.equal("1000000");

    balance = await token.balanceOf(owner);
    expect(balance.toString()).to.equal("0");
  });
});
