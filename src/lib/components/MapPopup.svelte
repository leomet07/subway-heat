<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import type { MTAStop, CollectedDataPoint } from "$lib/types";

    interface MapContainerProps {
        stop: MTAStop;
        collectedData: CollectedDataPoint[];
    }
    let { stop, collectedData }: MapContainerProps = $props();

    let matched_collected_data = collectedData.filter(
        (v) =>
            v.gtfs_stop_id == stop.gtfs_stop_id &&
            currentViewInfo.orderedDatesList[
                currentViewInfo.currentDateIndex
            ] == v.Date,
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
    {#if matched_collected_data.length > 0}
        <div class="collection_info_div">
            <p>
                Platform Level Air Temperature: {matched_collected_data[0][
                    "Platform level air temperature"
                ]}°F
            </p>
            <p>
                Platform Level Relative Humidity: {matched_collected_data[0][
                    "Platform level relative humidity"
                ]}%
            </p>
            <p>
                Street Level Air Temperature: {matched_collected_data[0][
                    "Street level air temperature"
                ]}°F
            </p>
            <p>
                Street Level Relative Humidity: {matched_collected_data[0][
                    "Street level relative humidity"
                ]}%
            </p>
            <p class="platform_timestamp">
                Platform data collected at {matched_collected_data[0]
                    .platform_collection_timestamp}
            </p>
        </div>
    {:else}
        <p>
            No data collected on {currentViewInfo.orderedDatesList[
                currentViewInfo.currentDateIndex
            ]}.
        </p>
    {/if}
    <button onclick={selectStation}> Select this station </button>
</div>

<style scoped>
    .popup {
        color: black;
    }
    .collection_info_div {
        margin-block: 1rem;
    }
    .collection_info_div p {
        margin-block: 0;
    }
    .collection_info_div .platform_timestamp {
        margin-top: 0.5rem;
    }
</style>
