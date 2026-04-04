import { IArtist } from "@/entities/artist"
import { ITrack } from "@/entities/track"
import { IUser } from "@/entities/user"

export interface ISearchReq {
    search: string
    filter: string
}

export interface ISearch {
    artists: IArtist[] 
    tracks: ITrack[]
    users: IUser[]
}

export interface ISearchRes {
    result: ISearch
}