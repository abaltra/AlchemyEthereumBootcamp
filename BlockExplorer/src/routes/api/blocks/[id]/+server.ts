import { _ } from "$env/static/private";
import { alchemy, alchemyUtils } from "$lib/apis";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const id = event.params.id || "";

    try {
        const block = await alchemy.core.getBlockWithTransactions(id);
        return json(block)    
    } catch (error) {
        throw error(500, error);
    }
}