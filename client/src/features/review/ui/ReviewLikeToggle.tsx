import { LikeIcon } from '@/shared/ui'
import styles from './ReviewLikeToggle.module.scss'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { toggleLikeReviewThunk } from '@/features/track'
import { selectAuthUser } from '@/features/auth'

interface ReviewLikeToggleProps {
    likesCount: number
    isLiked: boolean
    reviewId: number
}

export const ReviewLikeToggle: FC<ReviewLikeToggleProps> = ({ likesCount, isLiked, reviewId }) => {

    const dispatch = useAppDispatch()
    const authUser = useAppSelector(selectAuthUser)

    const onToggleLike = () => {
        dispatch(toggleLikeReviewThunk({ reviewId, userId: authUser?.id }))
    }

    return (
        <div className={`${styles.wrapper} ${isLiked ? styles.active : ''}`} onClick={onToggleLike}>
            <LikeIcon /> {likesCount}
        </div>
    )
}
