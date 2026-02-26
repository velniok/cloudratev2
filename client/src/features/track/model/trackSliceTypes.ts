import { ITrack } from "@/entities/track";
import { TStatus } from "@/shared/types";

export interface ITrackState {
    trackList: ITrack[] | null
    trackListStatus: TStatus
    track: ITrack
    trackStatus: TStatus
    error: string | null
}