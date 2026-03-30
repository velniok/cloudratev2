import type { FC } from "react"
import { ReviewCard, ReviewCardSkeleton, type IReview } from "@/entities/review"
import { PaginationButtons, Title } from "@/shared/ui"
import styles from "./TrackReviews.module.scss"
import { TStatus } from "@/shared/types"
import { ITrack } from "@/entities/track"
import { ReviewLikeToggle } from "@/features/review"
import { useAppSelector, usePagination } from "@/shared/lib"
import { getTrackReviewsTextThunk, selectTrackReviewsText, selectTrackReviewsTextPagination, selectTrackReviewsTextStatus } from "@/features/track"

interface TrackReviewsProps {
    track: ITrack
    trackStatus: TStatus
}

export const TrackReviews: FC<TrackReviewsProps> = ({ track, trackStatus }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getTrackReviewsTextThunk, `/track/${track.id}`, 10, track.id )
    const reviewsText = useAppSelector(selectTrackReviewsText)
    const reviewsTextStatus = useAppSelector(selectTrackReviewsTextStatus)
    const reviewsTextPagination = useAppSelector(selectTrackReviewsTextPagination)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ОТЗЫВЫ ПОЛЬЗОВАТЕЛЕЙ</Title>
                {
                    reviewsTextStatus === 'success'
                    ?
                    <>
                    {
                        reviewsText.length === 0 ?
                        <p className={styles.text}>Отзывов нет</p>
                        :
                        <>
                        <p className={styles.text}>Показано {((+reviewsTextPagination?.page - 1) * limit) + 1}-{(limit * +reviewsTextPagination?.page)} из {+reviewsTextPagination?.total}</p>
                        <ul className={styles.list}>
                            {
                                reviewsText.map((review: IReview) => {
                                    if (review.text) return (
                                        <ReviewCard
                                            key={review.id}
                                            review={review}
                                            actions={<ReviewLikeToggle reviewId={review.id} likesCount={+review.likesCount} isLiked={review.isLiked} />}
                                        />
                                    )
                                })
                            }
                        </ul>
                        <div className={styles.bottom}>
                            <PaginationButtons
                                page={+reviewsTextPagination.page}
                                totalPages={reviewsTextPagination.totalPages}
                                hundleNextPage={hundleNextPage}
                                hundlePrevPage={hundlePrevPage}
                                hundlePage={hundlePage}
                            />
                        </div>
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
    )
}
