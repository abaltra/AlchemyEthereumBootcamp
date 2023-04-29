import { json, type RequestHandler } from '@sveltejs/kit'
import { alchemy } from "$lib/apis";
// /api/newsletter GET


export const GET: RequestHandler = async (event) => {
    const block = await alchemy.core.getBlockWithTransactions("latest");
    return json(block)
}