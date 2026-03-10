export interface IUpdateUserReq {
    id: number,
    req: {
        nickname: string
        username: string
        email: string
        avatarUrl: string
        password: string
    }
}