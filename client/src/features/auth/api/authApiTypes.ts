import type { IUser } from "@/entities/user";

export interface IRegisterReq {
  email: string
  password: string
  nickname: string
}

export interface IAuthRes {
  user: IUser
  token: string
}

export interface ILoginReq {
  email: string
  password: string
}