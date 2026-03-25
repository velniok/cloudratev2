import { LikeIcon } from '@/shared/ui'
import styles from './ReviewLikeToggle.module.scss'
import { FC } from 'react'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { toggleLikeReviewThunk } from '@/features/track'
import { selectAuthUser } from '@/features/auth'

interface ReviewLikeToggleProps {
    likesCount: number
    isLiked: boolean
    reviewId: number
}

export const ReviewLikeToggle: FC<ReviewLikeToggleProps> = ({ likesCount, isLiked, reviewId }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const authUser = useAppSelector(selectAuthUser)

    const onToggleLike = () => {
        if (authUser?.id) {
            dispatch(toggleLikeReviewThunk({ reviewId, userId: authUser?.id }))
        } else {
            notify('Вы не авторизованы', 'Прежде чем сделать это, авторизуйтесь', 'error')
        }
    }

    return (
        <div className={`${styles.wrapper} ${isLiked ? styles.active : ''}`} onClick={onToggleLike}>
            <LikeIcon /> {likesCount}
        </div>
    )
}
