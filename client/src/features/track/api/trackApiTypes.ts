export interface ITrackReq {
    title: string
    coverUrl: string
    artistIds: string[]
}

export interface ITrackUpdateReq {
    id: number
    req: {
        title: string
        coverUrl: string
    }
}