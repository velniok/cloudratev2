import { IArtist } from "@/entities/artist";
import { TStatus } from "@/shared/types";

export interface IArtistState {
    artistList: IArtist[] | null
    artistListStatus: TStatus
    artist: IArtist | null
    artistStatus: TStatus
    error: string | null
}