<script lang="ts">
    import MapContainer from "$lib/components/MapContainer.svelte";
    import Timeline from "$lib/components/Timeline.svelte";
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    currentViewInfo.orderedDatesList = data.orderedDatesList;
</script>

<header class="header">
    <hgroup>
        <h1 class="title">Historical Subway Heat Map</h1>
        <p>
            Visit the <a href="/about">about page</a> to learn more about this project.
        </p>
    </hgroup>
</header>

<Timeline collectedStops={data.collectedStops} />

<MapContainer
    collectedStops={data.collectedStops}
    uniqueStops={data.uniqueStops}
    collectedData={data.collectedData}
/>
