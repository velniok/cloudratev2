import { ITrack } from "@/entities/track";
import { TStatus } from "@/shared/types";

export interface ITrackState {
    track: ITrack
    trackStatus: TStatus
    trackError: string | null
    trackList: ITrack[] | null
    trackListStatus: TStatus
    trackListError: string | null
}