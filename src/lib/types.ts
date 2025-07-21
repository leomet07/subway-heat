// thank you https://app.quicktype.io/

export interface MTAStop {
    readonly gtfs_stop_id: string;
    readonly station_id: string;
    readonly complex_id: string;
    readonly division: Division;
    readonly line: string;
    readonly stop_name: string;
    readonly borough: Borough;
    readonly cbd: Cbd;
    readonly daytime_routes: string;
    readonly structure: Structure;
    readonly gtfs_latitude: string;
    readonly gtfs_longitude: string;
    readonly north_direction_label: string;
    readonly south_direction_label: string;
    readonly ada: string;
    readonly ada_northbound: string;
    readonly ada_southbound: string;
    readonly georeference: Georeference;
    readonly ada_notes?: string;
}

export enum Borough {
    Bk = "Bk",
    Bx = "Bx",
    M = "M",
    Q = "Q",
    Si = "SI",
}

export enum Cbd {
    False = "False",
    True = "True",
}

export enum Division {
    Bmt = "BMT",
    Ind = "IND",
    Irt = "IRT",
    Sir = "SIR",
}

export interface Georeference {
    readonly type: Type;
    readonly coordinates: number[];
}

export enum Type {
    Point = "Point",
}

export enum Structure {
    AtGrade = "At Grade",
    Elevated = "Elevated",
    Embankment = "Embankment",
    OpenCut = "Open Cut",
    Subway = "Subway",
    Viaduct = "Viaduct",
}

export interface CollectedDataPoint {
    readonly Timestamp: string;
    readonly Date: string;
    readonly platform_collection_timestamp: string;
    readonly Services: string;
    readonly "Station name": string;
    readonly "Platform level air temperature": string;
    readonly "Platform level relative humidity": string;
    readonly "Number (ID) of the infrared image ": string;
    readonly "How crowded is the platform?": string;
    readonly "Time for platform level data collection": string;
    readonly "Street level air temperature": string;
    readonly "Street level air temperature - Sunny conditions (complete only if there is no shady spot near the subway entrance)": string;
    readonly "Street level relative humidity": string;
    readonly "Time for street level data collection": string;
    readonly "Cloud cover": string;
    readonly Rain: string;
    readonly Notes: string;
    readonly "Main level (Turnstile level) air temperature (Only for deep stations)": string;
    readonly "Main level (Turnstile level) relative humidity (Only for deep stations)": string;
    readonly gtfs_stop_id: string;
}
