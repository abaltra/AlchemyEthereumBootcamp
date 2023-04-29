import { _ } from "$env/static/private";
import { alchemy, alchemyUtils } from "$lib/apis";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const tokenId = event.params.tokenId || "";
    const contractAddress = event.params.contractAddress || "";

    try {
        const nfts = await alchemy.nft.getNftMetadataBatch([{
            contractAddress: contractAddress,
            tokenId: tokenId
        }])
        return json(nfts[0])    
    } catch (error) {
        throw error(500, error);
    }
}