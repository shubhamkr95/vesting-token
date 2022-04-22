# Vesting Contract

This is a Linear vesting contract to release the token gradually over a vesting period after a cliff.

# Features

1. It has 3 Roles- Advisor(5 %), Partnerships(0 %), Mentors(7%)
2. Dynamic TGE (Token Generation Event) for every role. % of Tokens to be released right after vesting
3. A cliff of 2 months added by the admin. No releasing of tokens within this cliff period.
4. The Vesting is linear vesting approach which means it released some amounts of tokens every day which is claimed by users based upon the allocations decided by the admin.

# Environment Variables

```
API_KEY="Alchemy Rinkeby api key"
RINKEBY_PRIVATE_KEY="private key of rinkeby wallet"
```

# Deployment

To deploy this project run

```
1.git clone https://github.com/shubhamkr95/vesting-token

2.cd vesting-token

3. npm install

4. npx hardhat compile

5. npm run solhint

6. npx hardhat run deploy scripts/deploy-token.js --network rinkeby

```

# Code style

```
npm run prettier:solidity
```

# Testing

```
npx hardhat test
```

# Deployed Address

Token address: [0x04e4B0192eeA3EB03029ff6F05Cf315B78dBCf6E](https://rinkeby.etherscan.io/address/0x04e4B0192eeA3EB03029ff6F05Cf315B78dBCf6E)

Vesting address:[0x8d17Fc04A7c989eF684add22D643e736dfdd4C85](https://rinkeby.etherscan.io/address/0x8d17fc04a7c989ef684add22d643e736dfdd4c85)
