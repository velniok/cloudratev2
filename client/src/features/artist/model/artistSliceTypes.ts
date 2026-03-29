import { IArtist } from "@/entities/artist";
import { ITrack } from "@/entities/track";
import { IPagination, TStatus } from "@/shared/types";

export interface IArtistState {
    artist: IArtist | null
    artistStatus: TStatus
    artistError: string | null

    tracks: ITrack[] | null
    tracksPagination: IPagination | null
    tracksStatus: TStatus

    artistList: IArtist[] | null
    artistListPagination: IPagination | null
    artistListStatus: TStatus
    artistListError: string | null
}