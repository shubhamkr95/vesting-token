async function main() {
 const [deployer] = await ethers.getSigners();

 console.log("Deploying contracts with the account:", deployer.address);

 console.log("Account balance:", (await deployer.getBalance()).toString());
 // Deploying token
 const Token = await ethers.getContractFactory("Token");
 const token = await Token.deploy();
 await token.deployed();

 // deploying TokenVesting contract
 const TokenVesting = await ethers.getContractFactory("TokenVesting");
 vesting = await TokenVesting.deploy(token.address);
 await vesting.deployed();

 console.log(`Token address ${token.address}`);
 console.log("Vesting contract deployed to:", vesting.address);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
