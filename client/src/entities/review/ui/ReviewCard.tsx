import { Link } from "react-router-dom"
import styles from "./ReviewsCard.module.scss"
import type { IReview } from "../model/types"
import type { FC } from "react"

interface ReviewCardProps {
    review: IReview
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className={styles.inner}>
            <Link to={'/user'} className={styles.user}>
                <div className={styles.avatar}></div>
                <p className={styles.nickname}>{review.nickname}</p>
            </Link>
            <p className={styles.review}>{review.review}</p>
        </div>
    )
}
