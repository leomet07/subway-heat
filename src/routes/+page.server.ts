import type { PageServerLoad } from './$types';
import StopsFileJSON from "$lib/stops.json";
import CollectedDataCSVString from "$lib/collected_data_with_gtfs_id.csv?raw"; // load as string
import type { MTAStop } from "$lib/types";
import { parse } from "csv-parse/sync";

export const load: PageServerLoad = async () => {
    let stops = StopsFileJSON as MTAStop[];
    const uniqueStops = stops.filter((obj, index, self) =>
        index === self.findIndex((t) => t.stop_name === obj.stop_name)
    );

    let CollectedDataCSV = parse(CollectedDataCSVString, {
        columns: true,
    });

    console.log(CollectedDataCSV);

    let gtfs_ids = new Set(CollectedDataCSV.map((v: any) => String(v.gtfs_stop_id)));

    let collectedStops: MTAStop[] = [];

    for (let stop of stops) {
        if (gtfs_ids.has(stop.gtfs_stop_id)) {
            collectedStops.push(stop);
        }
    }

    return {
        stops,
        uniqueStops,
        collectedStops
    };
};