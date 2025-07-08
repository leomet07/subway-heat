<script lang="ts">
    import { mount, onMount, unmount } from "svelte";
    import Map from "./Map.svelte";

    let selectedLayerIndex = $state<string>("0");
    let targetElement: HTMLDivElement;

    let layer_arcgis_ids = [
        "fc2060f60b0f4ba18e02b3594a2eae37",
        "b8a09d4b85264272a4718b10477017f9",
        "4fcfbaddb2804adc8aa3e7dc958ce0b8",
        "31c569068074431b9e759fd75aa23007",
        "26096e4e441f46efbb2ef5256d0bd084",
        "2f482466cc6c41b3ad38d6de9d4d6395",
    ];

    let layer_names = [
        "Platform Heat Index",
        "Street Level Heat Index",
        "Platform Air Temperature",
        "Street Level Temperature",
        "Platform Relative Humidity",
        "Street Level Relative Humidity",
    ];

    let mountedMap: any;

    async function handleMapChange() {
        unmount(mountedMap);
        mountedMap = mount(Map, {
            target: targetElement,
            props: {
                mapid: layer_arcgis_ids[Number(selectedLayerIndex)],
            },
        });
    }

    // on page load
    onMount(async () => {
        await handleMapChange();
    });
</script>

<article class="card">
    <h3>June 24th, 2025 Map: {layer_names[Number(selectedLayerIndex)]}</h3>
    <div bind:this={targetElement} class="map-div"></div>

    <select
        name="favorite-cuisine"
        bind:value={selectedLayerIndex}
        onchange={handleMapChange}
    >
        <option selected value="0">Platform Heat Index</option>
        <option value="1">Street Level Heat Index</option>
        <option value="2">Platform Air Temperature</option>
        <option value="3">Street Level Temperature</option>
        <option value="4">Platform Relative Humidity</option>
        <option value="5">Street Level Relative Humidity</option>
    </select>
</article>

<style scoped>
    .map-div {
        margin-bottom: 1rem;
        /* Match container size to map size so no layout shift occurs when map loads  */
        width: 100%;
        max-width: calc(1000px - calc(2 * --pico-spacing));
        height: 600px;
    }

    .card select {
        margin-bottom: 0;
    }
</style>
