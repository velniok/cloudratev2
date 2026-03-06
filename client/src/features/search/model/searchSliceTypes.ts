import { TStatus } from "@/shared/types";
import { ISearch } from "../api/searchApiTypes";

export interface ISearchState {
    search: ISearch | null
    status: TStatus
    error: string | null
}