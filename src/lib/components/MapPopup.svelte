<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import type { MTAStop, CollectedDataPoint } from "$lib/types";

    interface MapContainerProps {
        stop: MTAStop;
        collectedData: CollectedDataPoint[];
    }
    let { stop, collectedData }: MapContainerProps = $props();

    let matched_collected_data = collectedData.filter(
        (v) => v.gtfs_stop_id == stop.gtfs_stop_id,
    );

    function selectStation() {
        // this needs to happen first
        currentViewInfo.orderedDatesList = collectedData
            .filter((v) => v.gtfs_stop_id == stop.gtfs_stop_id)
            .map((v) => v["Date"]);

        currentViewInfo.currentGTFS_ID = stop.gtfs_stop_id;
        currentViewInfo.currentDateIndex = 0; // reset to first collection date for this stop
    }
</script>

<div class="popup" data-theme="light">
    <h4>{stop.stop_name}</h4>
    <pre>{JSON.stringify(matched_collected_data[0], null, 2)}</pre>
    <button onclick={selectStation}> Select this station </button>
</div>

<style scoped>
    .popup {
        color: black;
    }
</style>
