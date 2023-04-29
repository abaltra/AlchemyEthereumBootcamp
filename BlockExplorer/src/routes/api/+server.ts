import { json, type RequestHandler } from '@sveltejs/kit'
import { alchemy } from "$lib/apis";
// /api/newsletter GET


export const GET: RequestHandler = async (event) => {
    const [fees, gasPrice, block] = await Promise.all([
        alchemy.core.getFeeData(),
        alchemy.core.getGasPrice(),
        alchemy.core.getBlock("latest")
    ]);
    // const block = await alchemy.core.getBlockWithTransactions("latest");
    return json({
        fees,
        gasPrice,
        block
    })
}