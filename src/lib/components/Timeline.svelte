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
    <div class="timeline_container">
        <button
            class="left"
            onclick={() => currentViewInfo.currentDateIndex--}
            disabled={currentViewInfo.currentDateIndex == 0}
        >
            <span>&lt;</span>
        </button>
        <div class="center">
            <p>
                {currentViewInfo.orderedDatesList[
                    currentViewInfo.currentDateIndex
                ]}
            </p>
        </div>
        <button
            class="right"
            onclick={() => currentViewInfo.currentDateIndex++}
            disabled={currentViewInfo.currentDateIndex ==
                currentViewInfo.orderedDatesList.length - 1}
        >
            <span>&gt;</span>
        </button>
    </div>
    <div>
        {#if station_name}
            <p class="timeline_restriction_label">
                Currently using timeline for {station_name}.
            </p>
        {:else}
            <p class="timeline_restriction_label">
                Using timeline consisting of all data collection points.
            </p>
        {/if}
    </div>
</article>

<style scoped>
    .timeline_container {
        width: 100%;
        height: 60px;
        margin-bottom: 0.5rem;
        display: flex;
        position: relative;
    }

    button:active {
        transform: scale(0.99);
    }
    .right,
    .left {
        flex: 1;
        background-color: var(--pico-secondary);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: none;
    }

    .right:disabled,
    .left:disabled {
        background-color: grey;
    }

    .center {
        flex: 5;
        display: grid;
        place-items: center;
    }

    .center p {
        font-size: 2rem;
    }

    .timeline_restriction_label {
        font-size: 1.25rem;
        text-align: center;
        margin-bottom: 0;
    }
</style>
