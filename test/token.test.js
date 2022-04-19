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

 describe("Token properties", function () {
  it("Token should have name", async function () {
   const tokenName = await token.name();
   expect(await token.name()).to.equal(tokenName);
  });

  it("Token should have symbol", async function () {
   const tokenSymbol = "VT";
   expect(await token.symbol()).to.equal(tokenSymbol);
  });
 });

 describe("Transactions between users", function () {
  it("Should transfer tokens between accounts", async function () {
   await token.transfer(addr1.address, 1000);
   const addr1Balance = await token.balanceOf(addr1.address);
   expect(addr1Balance).to.equal(1000);

   // transfer 500 token from addr1 to addr2
   await token.connect(addr1).transfer(addr2.address, 1000);
   const addr2Balance = await token.balanceOf(addr2.address);
   expect(addr2Balance).to.equal(1000);
  });

  it("Should fail if sender don't have enough tokens", async function () {
   const initialOwnerBalance = await token.balanceOf(owner.address);

   //Try to send 1 token from addr1 to owner
   await expect(
    token.connect(addr1).transfer(owner.address, 1)
   ).to.be.revertedWith("transfer amount exceeds balance");

   // owner balance should not change
   expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
 });
});
