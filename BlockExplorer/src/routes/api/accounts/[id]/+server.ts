import { _ } from "$env/static/private";
import { alchemy, alchemyUtils } from "$lib/apis";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    if (!event.params.id) throw error(400, `Missing account ID`);
    const id = event.params.id || "";

    try {
        const [balance, transactionCount, latestBlock, nfts] = await Promise.all([
            alchemy.core.getBalance(id),
            alchemy.core.getTransactionCount(id),
            alchemy.core.getBlockWithTransactions("latest"),
            alchemy.nft.getNftsForOwner(id)
        ])

        let { transactions: _, ...block } = latestBlock;
        const blocks = [block];
        const transactions = latestBlock.transactions;
        for (let i = 1; i < 10; i++) {
            let blockWithTransactions = await alchemy.core.getBlockWithTransactions(blocks[blocks.length - 1].parentHash);
            let { transactions: _, ...block } = blockWithTransactions;
            blocks.push(block);
            transactions.push(...latestBlock.transactions);
        }
        
        return json({
            hash: event.params.id,
            balance: alchemyUtils.formatEther(balance._hex),
            transactionCount,
            transactionsReceived: transactions.filter(t => t.to == id),
            transactionsMade: transactions.filter(t => t.from == id),
            totalNfts: nfts.totalCount,
            nfts: nfts.ownedNfts
        })    
    } catch (error) {
        throw error(500, error);
    }
}