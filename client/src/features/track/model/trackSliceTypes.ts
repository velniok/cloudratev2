import { ITrack } from "@/entities/track";
import { IPagination, TStatus } from "@/shared/types";

export interface ITrackState {
    track: ITrack
    trackStatus: TStatus
    trackError: string | null
    trackList: ITrack[] | null
    trackListPagination: IPagination | null
    trackListStatus: TStatus
    trackListError: string | null
    newTracks: ITrack[] | null
    newTracksStatus: TStatus
}