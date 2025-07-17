<script lang="ts">
    let { mapid }: { mapid: string } = $props();
</script>

<arcgis-embedded-map
    style="width: 100%;max-width:calc(1000px - calc(2* --pico-spacing)); height:600px;"
    item-id={mapid}
    theme="dark"
    legend-enabled
    center="-73.92392114086026,40.71673186659029"
    scale="288895.277144"
    portal-url="https://stanford.maps.arcgis.com"
>
</arcgis-embedded-map>
