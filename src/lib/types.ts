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
