import { Link } from "react-router-dom"
import styles from "./ReviewCard.module.scss"
import type { IReview } from "../model/types"
import { MouseEvent, ReactNode, useState, type FC } from "react"
import { Cover, CriteriasPopup, EyeIcon, Rating } from "@/shared/ui"
import { getMonth, getOptimizedAvatar, useAppSelector } from "@/shared/lib"
import { selectAuthUser } from "@/features/auth"
import { ITrack } from "@/entities/track"

interface ReviewCardProps {
    review: IReview
    track?: ITrack
    actions?: ReactNode
    showMore?: boolean
}

export const ReviewCard: FC<ReviewCardProps> = ({ review, actions, track, showMore }) => {

    const authUser = useAppSelector(selectAuthUser)

    const [criterias, setCriterias] = useState<boolean>(false)
    const [more, setMore] = useState<boolean>(false)

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
                <div className={styles.info}>
                    <Link to={`/user/${review.user.username}`} className={styles.user}>
                        <Cover width="32px" height="32px" borderRadius="50%" url={getOptimizedAvatar(review.user.avatarUrl, 32, 32)} />
                        <p className={styles.nickname}>{review.user.nickname}</p>
                    </Link>
                    <Rating active={criterias} isHover={true} onClick={(e) => handleOpenCriterias(e)}>{review.rating}</Rating>
                    <CriteriasPopup close={() => setCriterias(false)} show={criterias} position="right" avgCriterias={[review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]} />
                    {
                        review.userId === authUser?.id && <p className={styles.yourText}>Ваша рецензия</p>
                    }
                </div> 
                {
                    track && <p className={styles.track}>о треке <Link to={`/track/${track.id}`}>{track.title}</Link></p>
                }
            </div>
            <p className={`${styles.review} ${showMore ? styles.visible : ''} ${more ? styles.more : ''}`}>{review.text}</p>
            <div className={`${styles.show} ${showMore ? styles.visible : ''} ${more ? styles.more : ''}`} onClick={() => setMore(!more)}>
                <EyeIcon />
            </div>
            <div className={styles.bottom}>
                <p className={styles.createdAt}>{new Date(review.createdAt).getUTCDate()} {getMonth(review.createdAt, 'pluralize')} {new Date(review.createdAt).getUTCFullYear()}</p>
                {
                    actions && <>{actions}</>
                }
            </div>
        </div>
    )
}
