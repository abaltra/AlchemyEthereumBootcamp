import { error, json } from '@sveltejs/kit'

export async function load({fetch, params}) {
    const account = await fetch(`/api/accounts/${params.id}`)
    
    if (!account) throw error(404);

    return await account.json()
}