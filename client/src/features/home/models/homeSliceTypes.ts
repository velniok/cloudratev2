import { IReview } from "@/entities/review";
import { ITrack } from "@/entities/track";
import { TStatus } from "@/shared/types";

export interface IHomeState {
    newTracks: ITrack[] | null
    newTracksStatus: TStatus

    newReviews: IReview[] | null
    newReviewsStatus: TStatus

    latestTracks: ITrack[] | null
    latestTracksStatus: TStatus

    error: null | string
}