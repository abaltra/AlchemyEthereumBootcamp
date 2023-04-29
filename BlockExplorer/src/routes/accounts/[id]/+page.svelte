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
<h2>Account {data.hash}</h2>
<ul>
    <li>
        Balance: {data.balance} ETH
    </li>
</ul>

<h4>Transactions</h4>
<p>Made:</p>
<ul>
    {#each data.transactionsMade as transaction}
        <li>
            <a href="/transactions/{transaction.hash}">{transaction.hash}</a>
        </li>
    {/each}
</ul>

<p>Received:</p>
<ul>
    {#each data.transactionsReceived as transaction}
        <li>
            <a href="/transactions/{transaction.hash}">{transaction.hash}</a>
        </li>
    {/each}
</ul>

<h4>NFTs:</h4>
<ul>
    {#each data.nfts as nft}
        <li>
            <a href="/nfts/{nft.contract.address}/{nft.tokenId}">{nft.contract.name}</a>
        </li>
    {/each}
</ul>