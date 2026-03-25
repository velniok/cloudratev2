export interface ITrackReq {
    title: string
    coverUrl: string
    artistIds: string[]
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