import { Link } from "react-router-dom"
import styles from "./ReviewCard.module.scss"
import type { IReview } from "../model/types"
import { ReactNode, useEffect, useRef, useState, type FC } from "react"
import { Badges, Cover, CriteriasTooltip, EyeIcon, Rating, Tooltip } from "@/shared/ui"
import { getMonth, getOptimizedAvatar, useAppSelector } from "@/shared/lib"
import { selectAuthUser } from "@/features/auth"
import { ITrack } from "@/entities/track"
import { IUser } from "@/entities/user"
import { deleteReviewApi } from "@/features/review"

interface ReviewCardProps {
    review: IReview
    track?: ITrack
    user: IUser
    actions?: ReactNode
    showMore?: boolean
}

export const ReviewCard: FC<ReviewCardProps> = ({ review, actions, track, showMore, user }) => {

    const authUser = useAppSelector(selectAuthUser)
    const reviewRef = useRef<HTMLParagraphElement>(null)

    const [more, setMore] = useState<boolean>(false)
    const [isTooltip, setIsTooltip] = useState<boolean>(false)
    const [isOverflow, setIsOverflow] = useState<boolean>(false)

    useEffect(() => {
        const check = () => {
            if (reviewRef.current && !more) {
                const { scrollHeight, clientHeight } = reviewRef.current
                setIsOverflow(scrollHeight > clientHeight)
            }
        }
        check()

        const observer = new ResizeObserver(check)
        if (reviewRef.current) observer.observe(reviewRef.current)

        return () => observer.disconnect()
    }, [review.text])

    return (
        <div className={`${styles.inner} ${review.userId === authUser?.id ? styles.your : ''}`}>
            {
                authUser?.role === 'admin' &&
                <i className={`ph ph-trash ${styles.delete}`} onClick={() => deleteReviewApi({ id: review.id })}></i>
            }
            <div className={styles.top}>
                <div className={styles.info}>
                    <Link to={`/user/${user.username}`} className={styles.user}>
                        <Cover width="32px" height="32px" borderRadius="50%" url={getOptimizedAvatar(user.avatarUrl ?? '', 32, 32)} />
                        <p className={styles.nickname}>{user.nickname}</p>
                        {
                            <Badges badge={user.badges.find(badge => badge.isSelected)?.badgeName ?? null} />
                        }
                    </Link>
                    <Tooltip
                        tooltip={ <CriteriasTooltip avgCriterias={[review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]}  /> }
                        setIsTooltip={setIsTooltip}
                    >
                        <Rating isHover={isTooltip}>{review.rating}</Rating>
                    </Tooltip>
                </div> 
                {
                    track && <p className={styles.track}>о треке <Link to={`/track/${track.id}`}>{track.title}</Link></p>
                }
                {
                    review.userId === authUser?.id && <p className={styles.yourText}>Ваша рецензия</p>
                }
            </div>
            <p className={`${styles.review} ${showMore ? styles.visible : ''} ${more ? styles.more : ''}`} ref={reviewRef}>{review.text}</p>
            {
                (isOverflow || more) &&
                <div className={`${styles.show} ${showMore ? styles.visible : ''} ${more ? styles.more : ''}`} onClick={() => setMore(!more)}>
                    <EyeIcon />
                </div>
            }
            <div className={styles.bottom}>
                <p className={styles.createdAt}>{new Date(review.createdAt).getUTCDate()} {getMonth(review.createdAt, 'pluralize')} {new Date(review.createdAt).getUTCFullYear()}</p>
                {
                    actions && actions
                }
            </div>
        </div>
    )
}
