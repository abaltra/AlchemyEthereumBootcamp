require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

module.exports = {
  solidity: "0.8.18",
  networks: {
	sepolia: {
		url: process.env.ALCHEMY_SEPOLIA_URL,
		accounts: [process.env.SEPOLIA_PRIVATE_KEY],
		chainId: 11155111
	} 
  },
  etherscan: {
	apiKey: process.env.ETHERSCAN_KEY
  }
};
