export interface IUpdateUserReq {
    id: number,
    req: {
        nickname: string
        username: string | null
        email: string
        avatarUrl: string
        password: string
        soundcloudUrl: string
    }
}