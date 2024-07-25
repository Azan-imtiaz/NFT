require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { API_KEY, METAMASK_PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: API_KEY,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    },
  },
};
