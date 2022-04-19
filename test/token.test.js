const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
 let Token;
 let token;
 let owner;
 let addr1;
 let addr2;

 beforeEach(async function () {
  Token = await ethers.getContractFactory("Token");
  [owner, addr1, addr2] = await ethers.getSigners();

  token = await Token.deploy();
 });

 describe("Deployment", function () {
  it("Owner should have the total supply", async function () {
   const ownerBalance = await token.balanceOf(owner.address);
   expect(await token.totalSupply()).to.equal(ownerBalance);
  });
 });
});
