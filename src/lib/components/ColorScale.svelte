<script lang="ts">
    import chroma from "chroma-js";

    let colorScaleWidth = 1000;
    let stepWidth = 1;
    let numberOfSteps = colorScaleWidth / stepWidth;
    let colors = chroma
        .scale(["green", "yellow", "red"])
        .mode("lch")
        .colors(numberOfSteps);
</script>

<div>
    <h1>Color Scale</h1>
    <div class="color-scale" style={`width : ${colorScaleWidth}px`}>
        {#each colors as color, index}
            <span style={`background-color: ${color}; width: ${stepWidth}px;`}
            ></span>
        {/each}
    </div>
</div>

<style scoped>
    .color-scale {
        display: flex;
        height: 50px;
        max-width: 100%;
    }
    .color-scale span {
        height: 100%;
    }
</style>
