<script>
    import { onMount } from "svelte";

    // @ts-ignore
    /**
     * @type {any[]}
     */
    let transactions = [];

    onMount(async () => {
        await fetch("/api/transactions")
            .then(response => response.json())
            .then(data => {
                transactions = data.transactions
            })
            .catch(console.error);
    })
</script>

<ul>
{#each transactions as transaction}
    <li>Hash: <a href="/transactions/{transaction.hash}">{transaction.hash}</a></li>
{/each}
</ul>