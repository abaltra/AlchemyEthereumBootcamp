import { alchemy, alchemyUtils } from "$lib/apis";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {

    if (!event.params.id) throw error(400, `Missing transaction ID`);
    const id = event.params.id;

    const transaction = await alchemy.core.getTransactionReceipt(id);
    return json({
        hash: transaction?.transactionHash,
        to: transaction?.to,
        from: transaction?.from,
        contractAddress: transaction?.contractAddress,
        gasUsed: alchemyUtils.formatEther(transaction?.gasUsed._hex || 0),
        blockHash: transaction?.blockHash,
        status: transaction?.status,
        effectiveGasPrice: alchemyUtils.formatEther(transaction?.effectiveGasPrice._hex || 0)
    })
}