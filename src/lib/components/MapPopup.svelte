<script lang="ts">
    import type { MTAStop } from "$lib/types";

    interface MapContainerProps {
        stop: MTAStop;
    }
    let { stop }: MapContainerProps = $props();
</script>

<div class="popup" data-theme="light">
    <h4>{stop.stop_name}</h4>
</div>

<style scoped>
    .popup {
        color: black;
    }
</style>
