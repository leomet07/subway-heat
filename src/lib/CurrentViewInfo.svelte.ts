interface currentViewInfoType {
    currentDateIndex: number;
    currentGTFS_ID: string | undefined;
    orderedDatesList: string[];
}

export const currentViewInfo: currentViewInfoType = $state({
    currentDateIndex: 135,
    currentGTFS_ID: undefined,
    orderedDatesList: []
});