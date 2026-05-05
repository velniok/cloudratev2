import { ITempArtist } from "@/entities/artist"

export interface ISuggestionTrackReq {
    title: string
    coverUrl: string
    artistId: number | null
    featArtistIds: (number | null)[]
    soundcloudUrl: string
    releaseData: string
    tempArtist: ITempArtist | null
    tempFeatArtists: ITempArtist[]
}