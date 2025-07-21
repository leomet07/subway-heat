<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import {
        Chart,
        Title,
        Tooltip,
        Legend,
        PointElement,
        CategoryScale,
        Colors,
        LinearScale,
        LineElement,
        LineController,
        TimeScale,
    } from "chart.js";
    import "chartjs-adapter-date-fns";
    import TargetVariableChooser from "$lib/components/TargetVariableChooser.svelte";
    import type { CollectedDataPoint } from "$lib/types";

    let { data }: PageProps = $props();

    let gtfs_id: string = page.params.gtfs_id;
    let chartElement: HTMLCanvasElement;

    Chart.register(
        Title,
        Tooltip,
        Legend,
        Colors,
        LineElement,
        LineController,
        LinearScale,
        CategoryScale,
        PointElement,
        TimeScale,
    );

    let matchedStation = data.collectedStops.filter(
        (v) => v.gtfs_stop_id == gtfs_id,
    )[0];

    $effect(() => {
        load_chart(currentViewInfo.targetVariable);
    });

    let myChart: Chart<"line", number[], any> | undefined;

    function load_chart(targetVariable: keyof CollectedDataPoint) {
        if (myChart) {
            myChart.destroy();
        }
        let thisStationData = data.collectedData.filter(
            (v) => v.gtfs_stop_id == gtfs_id,
        );

        let Xs: any[] = thisStationData.map(
            (v) => new Date(v["platform_collection_timestamp"]),
            // TODO: Adjust this to be street level collection timestamp after updating CSV
        );
        let Ys: number[] = thisStationData.map((v) =>
            Number(v[targetVariable]),
        );
        myChart = new Chart(chartElement, {
            type: "line",
            data: {
                labels: Xs,
                datasets: [
                    {
                        label: targetVariable,
                        data: Ys,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                        },
                        title: { display: true, text: "Collection Timestamp" },
                    },
                    y: {
                        title: { display: true, text: targetVariable },
                    },
                },
            },
        });
    }

    onMount(() => {
        if (browser && window) {
            load_chart(currentViewInfo.targetVariable);
        }
    });
</script>

<h1>
    Time Series for {matchedStation.stop_name} ({matchedStation.daytime_routes})
</h1>
<TargetVariableChooser />
<div>
    <canvas id="myChart" bind:this={chartElement}></canvas>
</div>
