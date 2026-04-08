import { RootState } from "@/app/store";

export const selectSuggestionList = (state: RootState) => state.suggestion.suggestionList
export const selectSuggestionListStatus = (state: RootState) => state.suggestion.suggestionListStatus
export const selectSuggestionListError = (state: RootState) => state.suggestion.suggestionListError