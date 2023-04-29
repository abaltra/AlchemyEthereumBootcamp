import { error } from '@sveltejs/kit'

export async function load({fetch, params}) {
    const nft = await fetch(`/api/nfts/${params.contractAddress}/${params.tokenId}`)
    
    if (!nft) throw error(404);
    return await nft.json()
}