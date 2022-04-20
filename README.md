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

6. npx hardhat run deploy scripts/deploy-token.js --network rinkeby

```

# Testing

```
npx hardhat test
```
