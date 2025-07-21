import chroma from "chroma-js";

export let colorScaleWidth = 900;
export let stepWidth = 1;
export let numberOfSteps = colorScaleWidth / stepWidth;
export let colorsArray = chroma
    .scale(["green", "yellow", "red"])
    .mode("lch")
    .colors(numberOfSteps);