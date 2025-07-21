<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
</script>

<article class="card">
    <h1>Timeline</h1>
    <p>
        Currently selected station ID: {currentViewInfo.currentGTFS_ID ??
            "None"}
    </p>
    <p>
        Currently selected date: {currentViewInfo.orderedDatesList[
            currentViewInfo.currentDateIndex
        ]}
    </p>

    <button onclick={() => currentViewInfo.currentDateIndex--}>Left</button>
    <button onclick={() => currentViewInfo.currentDateIndex++}>Right</button>
</article>

<style scoped>
    .card {
        outline: 1px solid red;
    }
</style>
