import { Link } from "react-router-dom"
import styles from "./ReviewsCard.module.scss"
import type { IReview } from "../model/types"
import type { FC } from "react"
import { Cover } from "@/shared/ui"

interface ReviewCardProps {
    review: IReview
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    console.log(review.trackId)

    return (
        <div className={styles.inner}>
            <Link to={`/user/${review.user.id}`} className={styles.user}>
                <Cover width="32px" height="32px" borderRadius="50%" url={review.user.avatarUrl} />
                <p className={styles.nickname}>{review.user.nickname}</p>
            </Link>
            <p className={styles.review}>{review.text}</p>
        </div>
    )
}
