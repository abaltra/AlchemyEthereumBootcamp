import { error } from '@sveltejs/kit'

export async function load({fetch, params}) {
    const transaction = await fetch(`/api/transactions/${params.id}`)
    
    if (!transaction) throw error(404);
    return await transaction.json()
}