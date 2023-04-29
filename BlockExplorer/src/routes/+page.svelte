<script>
    import TransactionList from "$lib/TransactionList.svelte";
    import { Utils } from "alchemy-sdk";

    export let data;

</script>

<h1>Welcome to Blockiest Explorer!</h1>
<p>Latest Block : <a href="blocks/{data.block.hash}">{data.block.hash}</a></p>
<p>Latest Gas Price: {Utils.formatEther(data.gasPrice.hex)} ETH</p>
<p>Max Fee: {Utils.formatEther(data.fees.maxFeePerGas)} ETH</p>

<h3>Latest Transactions</h3>
<TransactionList></TransactionList>


