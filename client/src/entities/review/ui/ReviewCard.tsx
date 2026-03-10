import { Link } from "react-router-dom"
import styles from "./ReviewCard.module.scss"
import type { IReview } from "../model/types"
import { MouseEvent, useState, type FC } from "react"
import { Cover, CriteriasPopup, Rating } from "@/shared/ui"
import { useAppSelector } from "@/shared/lib"
import { selectAuthUser } from "@/features/auth"

interface ReviewCardProps {
    review: IReview
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {

    const authUser = useAppSelector(selectAuthUser)

    const [criterias, setCriterias] = useState<boolean>(false)

    const handleOpenCriterias = (e: MouseEvent) => {
        e.stopPropagation()
        if (true) {
            document.dispatchEvent(new Event('closePopups'))
        }
        setCriterias(!criterias)
    }

    return (
        <div className={`${styles.inner} ${review.userId === authUser?.id ? styles.your : ''}`}>
            <div className={styles.top}>
                <Link to={`/user/${review.user.username}`} className={styles.user}>
                    <Cover width="32px" height="32px" borderRadius="50%" url={review.user.avatarUrl} />
                    <p className={styles.nickname}>{review.user.nickname}</p>
                </Link>
                <Rating active={criterias} isHover={true} onClick={(e) => handleOpenCriterias(e)}>{review.rating}</Rating>
                <CriteriasPopup close={() => setCriterias(false)} show={criterias} position="top" avgCriterias={[review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]} />
                {
                    review.userId === authUser?.id && <p className={styles.yourText}>Ваша рецензия</p>
                }
            </div>
            <p className={styles.review}>{review.text}</p>
        </div>
    )
}
