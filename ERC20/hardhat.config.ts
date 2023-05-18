import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
	sepolia: {
		url: process.env.ALCHEMY_SEPOLIA_URL,
		accounts: [process.env.RINKEBY_PRIVATE_KEY],
		chainId: 11155111
	}
  }
};

export default config;
