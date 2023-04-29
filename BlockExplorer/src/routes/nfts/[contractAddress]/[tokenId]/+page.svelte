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
<p>Title: {data.title}</p>
<p>Description: {data.description}</p>
<p>Last Updated at: {data.timeLastUpdated}</p>
<p>Token Type: {data.tokenType}</p>

{#if data.media && data.media.length > 0}
    {#each data.media as media }
    <img src="{media.gateway}" alt="">
        
    {/each}
{/if}
