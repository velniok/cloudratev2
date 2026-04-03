export interface ITrackReq {
    title: string
    coverUrl: string
    artistId: number
    featArtistIds: number[]
    soundcloudUrl: string
    releaseData: string
}

export interface ITrackUpdateReq {
    id: number
    req: {
        title: string
        coverUrl: string
        soundcloudUrl: string
        releaseData: string
    }
}

export interface ISoundcloudTrack {
    title: string
    coverUrl: string
    soundcloudUrl: string
    releaseData: string
}