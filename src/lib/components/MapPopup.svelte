<script lang="ts">
    import type { MTAStop, CollectedDataPoint } from "$lib/types";

    interface MapContainerProps {
        stop: MTAStop;
        collectedData: CollectedDataPoint[];
    }
    let { stop, collectedData }: MapContainerProps = $props();

    let matched_collected_data = collectedData.filter(
        (v) => v.gtfs_stop_id == stop.gtfs_stop_id,
    );
</script>

<div class="popup" data-theme="light">
    <h4>{stop.stop_name}</h4>
    <pre>{JSON.stringify(matched_collected_data[0], null, 2)}</pre>
    <button>Select this station</button>
</div>

<style scoped>
    .popup {
        color: black;
    }
</style>
