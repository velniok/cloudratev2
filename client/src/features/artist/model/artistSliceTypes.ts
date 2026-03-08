import { IArtist } from "@/entities/artist";
import { IPagination, TStatus } from "@/shared/types";

export interface IArtistState {
    artist: IArtist | null
    artistStatus: TStatus
    artistError: string | null
    artistList: IArtist[] | null
    artistListPagination: IPagination | null
    artistListStatus: TStatus
    artistListError: string | null
}