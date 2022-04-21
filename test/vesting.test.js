const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Vesting", function () {
 let admin;
 let advisor;
 let mentors;
 let token;
 let vesting;

 beforeEach(async function () {
  // getting admin and mentors address
  [admin, advisor, mentors] = await ethers.getSigners();

  // Deploying  token
  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy();
  await token.deployed();

  // deploying TokenVesting contract
  const TokenVesting = await ethers.getContractFactory("TokenVesting");
  vesting = await TokenVesting.deploy(token.address);
  await vesting.deployed();
 });

 describe("Vest Token", function () {
  it("Should approve token spend", async function () {
   // Approving vesting contract to spend on behalf of owner
   const tokenTotalSupply = await token.totalSupply();
   const parseTokenTotalSupply = tokenTotalSupply.toString();
   const approveContract = await token.approve(
    vesting.address,
    ethers.BigNumber.from(parseTokenTotalSupply)
   );
   await approveContract.wait();
   expect(await token.allowance(admin.address, vesting.address)).to.equal(
    ethers.BigNumber.from(parseTokenTotalSupply)
   );
  });
 });

 describe("Vesting smart contract", function () {
  it("Should create vesting ", async function () {
   // create vesting
   const roles = [0, 1, 2]; // Advisor (0), Partnerships(1), Mentors(2)
   const createVesting = await vesting.createVesting(
    roles[0],
    advisor.address,
    0,
    1682081183 //UNIX time - Fri Apr 21 2023
   );
   await createVesting.wait();
   expect(await vesting.isVested(advisor.address)).to.equal(true);
  });

  it("Should release vesting", async function () {
   // Approve vesting contract
   const tokenTotalSupply = await token.totalSupply();
   const parseTokenTotalSupply = tokenTotalSupply.toString();
   const approveContract = await token.approve(
    vesting.address,
    ethers.BigNumber.from(parseTokenTotalSupply)
   );
   approveContract.wait();
   expect(await token.allowance(admin.address, vesting.address)).to.equal(
    ethers.BigNumber.from(parseTokenTotalSupply)
   );
  });

  // Create vesting
  const roles = [0, 1, 2]; // Advisor (0), Partnerships(1), Mentors(2)
 });
});
