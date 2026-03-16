import { ITrack } from "@/entities/track";
import { TStatus } from "@/shared/types";

export interface IHomeState {
    newTracks: ITrack[] | null,
    newTracksStatus: TStatus,

    error: null | string
}