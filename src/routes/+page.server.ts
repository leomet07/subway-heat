import type { PageServerLoad } from './$types';
import StopsFileJSON from "$lib/stops.json";
import CollectedDataCSVString from "$lib/collected_data_with_gtfs_id.csv?raw"; // load as string
import type { MTAStop, CollectedDataPoint } from "$lib/types";
import { parse } from "csv-parse/sync";

export const load: PageServerLoad = async () => {
    let stops = StopsFileJSON as MTAStop[];
    const uniqueStops = stops.filter((obj, index, self) =>
        index === self.findIndex((t) => t.stop_name === obj.stop_name)
    );

    let collectedData = parse<CollectedDataPoint>(CollectedDataCSVString, {
        columns: true,
    });

    collectedData.sort((a, b) => { return (new Date(a["platform_collection_timestamp"]).getTime()) - (new Date(b["platform_collection_timestamp"]).getTime()) })

    let gtfs_ids = new Set(collectedData.map((v) => v.gtfs_stop_id));

    let collectedStops: MTAStop[] = [];

    for (let stop of stops) {
        if (gtfs_ids.has(stop.gtfs_stop_id)) {
            collectedStops.push(stop);
        }
    }

    return {
        stops,
        uniqueStops,
        collectedStops,
        collectedData
    };
};