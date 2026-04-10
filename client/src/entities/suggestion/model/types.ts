import { IArtist } from "@/entities/artist"
import { IUser } from "@/entities/user"

export interface ISuggestion {
    id: number
    userId: number
    title: string
    artistId: number
    featArtistIds: number[]
    soundcloudUrl: string
    coverUrl: string
    releaseData: string
    status: 'pending' | 'accepted' | 'rejected'
    rejectReason: string | null
    createdAt: string
    reviewedAt: string | null
    reviewedBy: number | null
    user: IUser
    artist: IArtist
    featArtists: IArtist[]
    reviewedByUser: IUser | null
    trackId: number | null
}