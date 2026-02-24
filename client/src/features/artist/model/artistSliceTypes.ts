import { IArtist } from "@/entities/artist";
import { TStatus } from "@/shared/types";

export interface IArtistState {
    artistList: IArtist[] | null
    artistListStatus: TStatus
    error: string | null
}