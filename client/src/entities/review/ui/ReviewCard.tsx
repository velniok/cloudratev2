import { Link } from "react-router-dom"
import styles from "./ReviewCard.module.scss"
import type { IReview } from "../model/types"
import type { FC } from "react"
import { Cover, Rating } from "@/shared/ui"

interface ReviewCardProps {
    review: IReview
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {

    return (
        <div className={styles.inner}>
            <Link to={`/user/${review.user.id}`} className={styles.user}>
                <Cover width="32px" height="32px" borderRadius="50%" url={review.user.avatarUrl} />
                <p className={styles.nickname}>{review.user.nickname}</p>
                <Rating>{review.rating}</Rating>
            </Link>
            <p className={styles.review}>{review.text}</p>
        </div>
    )
}
