import { error } from '@sveltejs/kit'

export async function load({fetch, params}) {
    const baseData = await fetch(`/api`)
    return await baseData.json()
}