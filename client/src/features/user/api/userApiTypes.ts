export interface IUpdateUserReq {
    id: number,
    req: {
        nickname: string
        email: string
        avatarUrl: string
        password: string
    }
}