<script>
    /**
     * @type {any}
     */
    var id;
    export let data;

    export function back() {
        history.back();
    }
</script>

<button on:click={back}> Back </button> 
<h2>Block {data.hash}</h2>
<p>Number: {data.number}</p>
<p>Parent: <a href="/blocks/{data.parentHash}">{data.parentHash}</p>
Transactions:
<ul>
    {#each data.transactions as transaction}
        <li>
            <a href="/transactions/{transaction.hash}">{transaction.hash}</a>
        </li>
    {/each}
</ul>