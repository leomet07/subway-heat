<script lang="ts">
    import { currentViewInfo } from "$lib/CurrentViewInfo.svelte";
    import type { CollectedDataPoint } from "$lib/types";

    let fields: Array<keyof CollectedDataPoint> = [
        "Platform level heat index",
        "Platform level air temperature",
        "Platform level relative humidity",
        "Street level heat index",
        "Street level air temperature",
        "Street level relative humidity",
    ];
    let field_ids = fields.map((field) =>
        field.toLowerCase().replace(/ /g, "-"),
    );
</script>

<fieldset>
    <legend>Target Variable:</legend>
    <div class="grid-container">
        {#each fields as field, index}
            <span class="radio-button-and-label-container">
                <input
                    type="radio"
                    id={field_ids[index]}
                    name={field_ids[index]}
                    value={field}
                    checked={field == currentViewInfo.targetVariable}
                    bind:group={currentViewInfo.targetVariable}
                />
                <label for={field_ids[index]}>{field}</label>
            </span>
        {/each}
    </div>
</fieldset>

<style scoped>
    .grid-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .radio-button-and-label-container {
        margin-right: 1rem;
    }
</style>
