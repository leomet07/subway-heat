<script lang="ts">
    import { onDestroy, onMount, mount, unmount } from "svelte";
    import type {
        CircleMarker,
        ImageOverlay,
        LatLngBounds,
        LatLngTuple,
        Map,
        Marker,
    } from "leaflet";
    import { browser } from "$app/environment";
    import "leaflet/dist/leaflet.css";
    import type { MTAStop } from "$lib/types";

    interface MapContainerProps {
        stops: MTAStop[];
        uniqueStops: MTAStop[];
    }
    let { stops, uniqueStops }: MapContainerProps = $props();

    let mapElement: HTMLElement;
    let map: Map;

    const defaultViewCoords: LatLngTuple = [40.7826, -73.9656]; // Central park coords

    onMount(async () => {
        if (browser && window) {
            const leaflet = await import("leaflet");

            map = leaflet.map(mapElement, {
                attributionControl: false,
                preferCanvas: true,
            }); // use canvas for better performance

            leaflet
                .tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    },
                )
                .addTo(map);

            map.setView(defaultViewCoords, 11);

            for (const stop of stops) {
                let marker = leaflet
                    .circleMarker(
                        // circle marker for better performance (cred: https://stackoverflow.com/a/43019740)
                        {
                            lat: Number(stop.gtfs_latitude),
                            lng: Number(stop.gtfs_longitude),
                        },
                        {
                            radius: 4,
                            fillOpacity: 1,
                            fillColor: "#fff42c",
                            color: "black",
                        },
                    )
                    .addTo(map)
                    .addEventListener("click", (e) => {
                        console.log("Marker clicked: ", stop);
                    });
            }
        }
    });
</script>

<div class="map" bind:this={mapElement}></div>

<style>
    .map {
        width: 100%;
        height: 80vh;
        height: 80dvh; /* Will be ignored when not supported */
    }
    /* Override styles applied by picocss */
    :global(.leaflet-control-zoom) {
        border: none !important;
        padding-bottom: 2px !important;
    }
    :global(.leaflet-control-zoom [role="button"]) {
        padding: 0px !important;
        border-radius: 0% !important;
    }
    :global(.leaflet-control-zoom a:last-child) {
        border-bottom: var(--pico-border-width) solid var(--pico-border-color) !important;
    }

    :global(.leaflet-marker-icon) {
        background-color: transparent !important;
        border: none !important;
    }

    :global(.leaflet-popup-close-button) {
        padding: 0px !important;
    }
</style>
