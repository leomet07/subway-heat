<script lang="ts">
    import {
        colorScaleWidth,
        stepWidth,
        colorsArray,
    } from "$lib/components/ColorScaleUtils";

    let { min, max, unit }: { min: number; max: number; unit: string } =
        $props();
</script>

<div class="color-scale-container">
    <span>{min}{unit}</span>
    <div class="color-scale" style={`width : ${colorScaleWidth}px`}>
        {#each colorsArray as color, index}
            <span style={`background-color: ${color}; width: ${stepWidth}px;`}>
                <!-- Empty span -->
            </span>
        {/each}
    </div>
    <span>{max}{unit}</span>
</div>

<style scoped>
    .color-scale {
        display: flex;
        height: 30px;
        max-width: calc(100% - 100px);
        margin-bottom: 1rem;
    }
    .color-scale span {
        height: 100%;
    }
    .color-scale-container {
        display: flex;
    }
    .color-scale-container span {
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
