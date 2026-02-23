import type { FC } from "react"
import { ReviewCard, type IReview } from "@/entities/review"
import { Title } from "@/shared/ui"
import styles from "./TrackReviews.module.scss"

interface TrackReviewsProps {
    reviews: IReview[]
}

export const TrackReviews: FC<TrackReviewsProps> = ({ reviews }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>Обзоры пользователей</Title>
                <div className={styles.list}>
                    {
                        reviews.map((review) => {
                            return <ReviewCard key={review.id} review={review} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
