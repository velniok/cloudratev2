import { ISuggestion } from "@/entities/suggestion";
import { TStatus } from "@/shared/types";

export interface ISuggestionState {
    suggestionList: ISuggestion[] | null,
    suggestionListStatus: TStatus,
    suggestionListError: string | null,
}