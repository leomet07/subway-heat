import type { PageServerLoad } from './$types';
import StopsFileJSON from "$lib/stops.json"
import type { MTAStop } from "$lib/types";

export const load: PageServerLoad = async () => {
    let stops = StopsFileJSON as MTAStop[];
    const uniqueStops = stops.filter((obj, index, self) =>
        index === self.findIndex((t) => t.stop_name === obj.stop_name)
    );

    return {
        stops,
        uniqueStops
    };
};