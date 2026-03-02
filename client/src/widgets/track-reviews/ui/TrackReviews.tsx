import type { FC } from "react"
import { ReviewCard, ReviewCardSkeleton, type IReview } from "@/entities/review"
import { Title } from "@/shared/ui"
import styles from "./TrackReviews.module.scss"
import { TStatus } from "@/shared/types"
import { ITrack } from "@/entities/track"

interface TrackReviewsProps {
    track: ITrack
    trackStatus: TStatus
}

export const TrackReviews: FC<TrackReviewsProps> = ({ track, trackStatus }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ОБЗОРЫ ПОЛЬЗОВАТЕЛЕЙ</Title>
                <div className={styles.list}>
                    {
                        trackStatus === 'success'
                        ?
                        <>
                        {
                            track.reviews.map((review: IReview) => {
                                if (review.text) return <ReviewCard key={review.id} review={review} />
                            })
                        }
                        </>
                        :
                        Array.from({ length: 3 }).map((_, index) => {
                            return <ReviewCardSkeleton key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
