<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
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
    } from "chart.js";
    import { onMount } from "svelte";
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
    );

    let Xs: any[] = [1, 2];
    let Ys: number[] = [4, 5];

    onMount(() => {
        if (browser && window) {
            new Chart(chartElement, {
                type: "line",
                data: {
                    labels: Xs,
                    datasets: [
                        {
                            label: "Squares",
                            data: Ys,
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                        },
                    ],
                },
            });
        }
    });
</script>

<h1>Time series for {gtfs_id}</h1>
<div>
    <canvas id="myChart" bind:this={chartElement}></canvas>
</div>
