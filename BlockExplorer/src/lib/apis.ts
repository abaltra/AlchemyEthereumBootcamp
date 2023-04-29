import { Alchemy, Utils, Network } from "alchemy-sdk";
import { ALCHEMY_API_KEY } from "$env/static/private";

const alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
});

export {
    alchemy,
    Utils as alchemyUtils
};