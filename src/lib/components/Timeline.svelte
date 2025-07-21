<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import type { MTAStop } from "$lib/types";
    let { collectedStops }: { collectedStops: MTAStop[] } = $props();

    let station_name = $derived(
        currentViewInfo.currentGTFS_ID
            ? collectedStops.filter(
                  (v) => v.gtfs_stop_id == currentViewInfo.currentGTFS_ID,
              )[0].stop_name
            : "None",
    );
</script>

<article class="card">
    <h1>Timeline</h1>
    <p>
        Currently selected station: {station_name}
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
