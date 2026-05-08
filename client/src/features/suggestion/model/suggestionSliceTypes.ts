import { ISuggestion } from "@/entities/suggestion";
import { IPagination, TStatus } from "@/shared/types";

export interface ISuggestionState {
    suggestionList: ISuggestion[] | null
    suggestionListPagination: IPagination | null
    suggestionListStatus: TStatus
    suggestionListError: string | null
}