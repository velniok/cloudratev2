import { IGeneral } from "@/entities/general";
import { TStatus } from "@/shared/types";

export interface IGeneralState {
    general: IGeneral | null
    status: TStatus
    error: string | null
}