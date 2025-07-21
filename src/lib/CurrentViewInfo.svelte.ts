import type { CollectedDataPoint } from "./types";

interface currentViewInfoType {
    currentDateIndex: number;
    currentGTFS_ID: string | undefined;
    orderedDatesList: string[];
    targetVariable: keyof CollectedDataPoint;
}

export const currentViewInfo: currentViewInfoType = $state({
    currentDateIndex: 135,
    currentGTFS_ID: undefined,
    orderedDatesList: [],
    targetVariable: "Platform level heat index"
});