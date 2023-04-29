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
<h2>TRANSACTION {data.hash}</h2>
<ul>
    <li>
        Part of block <a href="/blocks/{data.blockHash}">{data.blockHash}</a>
    </li>
    <li>
        From <a href="/accounts/{data.from}">{data.from}</a>
    </li>
    <li>
        To <a href="/accounts/{data.to}">{data.to}</a>
    </li>
    <li>
        Status: {#if data.status == 1}
            SUCCESS
            {:else}
            FAILURE
            {/if}
    </li>
    <li>
        Effective gas price: {data.effectiveGasPrice} ETH 
    </li>
    <li>
        Gas used: {data.gasUsed} ETH 
    </li>
    <!-- <li>
        GasLimit: {BigInt(data.gasLimit.hex).toString(10)}
    </li>
    <li>
        GasPrice: {BigInt(data.gasPrice.hex).toString(10)} -->
    <!-- </li> -->
</ul>