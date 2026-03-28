import { LikeIcon } from '@/shared/ui'
import styles from './ReviewLikeToggle.module.scss'
import { FC, useState } from 'react'
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
    
    const [likeLoading, setLikeLoading] = useState<boolean>(false)

    const onToggleLike = () => {
        if (authUser?.id) {
            setLikeLoading(true)
            dispatch(toggleLikeReviewThunk({ reviewId, userId: authUser?.id }))
                .then(() => setLikeLoading(false))
        } else {
            notify('Вы не авторизованы', 'Прежде чем сделать это, авторизуйтесь', 'error')
        }
    }

    return (
        <div className={`${styles.wrapper} ${isLiked ? styles.active : ''}`} onClick={onToggleLike}>
            <LikeIcon /> {likeLoading ? '..' : likesCount}
        </div>
    )
}
