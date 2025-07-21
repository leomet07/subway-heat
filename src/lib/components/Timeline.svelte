<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";

    interface TimelineProps {
        orderedDatesList: string[];
    }
    let { orderedDatesList }: TimelineProps = $props();
</script>

<article class="card">
    <h1>Timeline</h1>
    <p>Currently selected station ID: none</p>
    <p>
        Currently selected date: {orderedDatesList[
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
