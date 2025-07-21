<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import type { MTAStop } from "$lib/types";
    let { collectedStops }: { collectedStops: MTAStop[] } = $props();

    let station_name = $derived(
        currentViewInfo.currentGTFS_ID
            ? collectedStops.filter(
                  (v) => v.gtfs_stop_id == currentViewInfo.currentGTFS_ID,
              )[0].stop_name
            : undefined,
    );
</script>

<article class="card">
    {#if station_name}
        <p>Currently using timeline for {station_name}</p>
    {:else}
        <p>Using timeline consisting of all data collection points.</p>
    {/if}
    <p>
        {currentViewInfo.orderedDatesList[currentViewInfo.currentDateIndex]}
    </p>
    <div></div>
    <button onclick={() => currentViewInfo.currentDateIndex--}>Left</button>
    <button onclick={() => currentViewInfo.currentDateIndex++}>Right</button>
</article>

<style scoped>
    .card {
        /* outline: 1px solid red; */
    }
</style>
