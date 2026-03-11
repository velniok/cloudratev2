import type { FC } from "react"
import { ReviewCard, ReviewCardSkeleton, type IReview } from "@/entities/review"
import { Title } from "@/shared/ui"
import styles from "./TrackReviews.module.scss"
import { TStatus } from "@/shared/types"
import { ITrack } from "@/entities/track"
import { ReviewLikeToggle } from "@/features/review"

interface TrackReviewsProps {
    track: ITrack
    trackStatus: TStatus
}

export const TrackReviews: FC<TrackReviewsProps> = ({ track, trackStatus }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ОТЗЫВЫ ПОЛЬЗОВАТЕЛЕЙ</Title>
                <div className={styles.list}>
                    {
                        trackStatus === 'success'
                        ?
                        <>
                        {
                            track.reviews.length === 0 ?
                            <p className={styles.text}>Отзывов нет</p>
                            :
                            <>
                                {
                                    track.reviews.map((review: IReview) => {
                                        if (review.text) return (
                                            <ReviewCard
                                                key={review.id}
                                                review={review}
                                                actions={<ReviewLikeToggle reviewId={review.id} likesCount={+review.likesCount} isLiked={review.isLiked} />}
                                            />
                                        )
                                    })
                                }
                            </>
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
