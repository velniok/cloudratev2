import { IArtist } from "@/entities/artist";
import { TStatus } from "@/shared/types";

export interface IArtistState {
    artist: IArtist | null
    artistStatus: TStatus
    artistError: string | null
    artistList: IArtist[] | null
    artistListStatus: TStatus
    artistListError: string | null
}