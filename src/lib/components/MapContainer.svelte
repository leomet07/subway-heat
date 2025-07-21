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
    import type { CollectedDataPoint, MTAStop } from "$lib/types";
    import MapPopup from "./MapPopup.svelte";
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";

    interface MapContainerProps {
        collectedStops: MTAStop[];
        uniqueStops: MTAStop[];
        collectedData: CollectedDataPoint[];
    }
    let { collectedStops, uniqueStops, collectedData }: MapContainerProps =
        $props();

    let mapElement: HTMLElement;
    let map: Map;

    const defaultViewCoords: LatLngTuple = [40.7326, -73.9356]; // Central park coords

    let placeCircles = (
        currentDateIndex: number,
        currentGTFS_ID: string | undefined,
        orderedDatesList: string[],
    ) => {};
    $effect(() => {
        placeCircles(
            currentViewInfo.currentDateIndex,
            currentViewInfo.currentGTFS_ID,
            currentViewInfo.orderedDatesList,
        );
    });

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

            let circleMarkerLayerGroup = leaflet.layerGroup().addTo(map);

            // Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
            // `createFn` will be called whenever the popup is being created, and should create and return the component.
            // Credit: https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.18
            function bindPopup(
                marker: Marker | CircleMarker,
                createFn: (arg0: HTMLElement) => MapPopup,
            ) {
                let popupComponent: MapPopup | null;
                marker.bindPopup(() => {
                    let container = leaflet.DomUtil.create("div");
                    popupComponent = createFn(container);
                    return container;
                });

                marker.on("popupclose", () => {
                    if (popupComponent) {
                        let old = popupComponent;
                        popupComponent = null;
                        // Wait to destroy until after the fadeout completes.
                        setTimeout(() => {
                            unmount(old);
                        }, 500);
                    }
                });
            }

            placeCircles = (
                currentDateIndex: number,
                currentGTFS_ID: string | undefined,
                orderedDatesList: string[],
            ) => {
                console.log("Placing circles: ", currentGTFS_ID);
                circleMarkerLayerGroup.clearLayers(); // remove all markers

                for (const stop of collectedStops) {
                    let fillColor = `rgba(120,120,120,1)`; // grey

                    let allDataThisStop = collectedData.filter(
                        (data) => data.gtfs_stop_id == stop.gtfs_stop_id,
                    );

                    let dataThisStopThisDay = allDataThisStop.filter(
                        (v) => v.Date == orderedDatesList[currentDateIndex],
                    );

                    if (
                        allDataThisStop.length > 0 &&
                        dataThisStopThisDay.length > 0
                    ) {
                        fillColor = `rgb(255,255,0)`; // yellow
                    }

                    let marker = leaflet
                        .circleMarker(
                            // circle marker for better performance (cred: https://stackoverflow.com/a/43019740)
                            {
                                lat: Number(stop.gtfs_latitude),
                                lng: Number(stop.gtfs_longitude),
                            },
                            {
                                radius: 6,
                                fillOpacity: 1,
                                fillColor: fillColor,
                                color: "black",
                            },
                        )
                        .addTo(circleMarkerLayerGroup)
                        .addEventListener("click", (e) => {
                            console.log("Marker clicked: ", stop);
                        });

                    //@ts-ignore
                    bindPopup(marker, (container) => {
                        let c = mount(MapPopup, {
                            target: container,
                            props: {
                                stop: stop,
                                collectedData,
                            }, // i don't know if these props will update dynamically, warning for the future
                        });
                        return c;
                    });
                }
            };

            placeCircles(
                currentViewInfo.currentDateIndex,
                currentViewInfo.currentGTFS_ID,
                currentViewInfo.orderedDatesList,
            );
        }
    });
</script>

<div class="map" bind:this={mapElement}></div>

<style>
    .map {
        width: 100%;
        height: 65vh;
        height: 65dvh; /* Will be ignored when not supported */
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
