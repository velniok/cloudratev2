import { Slider, Title } from '@/shared/ui'
import styles from './NewReviews.module.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { getNewReviewsThunk, selectNewReviews, selectNewReviewsStatus } from '@/features/home'
import { ReviewCard, ReviewCardSkeleton } from '@/entities/review'
import { ReviewLikeToggle } from '@/features/review'

export const NewReviews = () => {

    const dispatch = useAppDispatch()
    const newReviews = useAppSelector(selectNewReviews)
    const newReviewsStatus = useAppSelector(selectNewReviewsStatus)

    useEffect(() => {
        dispatch(getNewReviewsThunk())
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>НОВЫЕ ОТЗЫВЫ</Title>
                <Slider>
                    {
                        newReviewsStatus === 'success' ?
                        newReviews.map((review) => {
                            return <ReviewCard review={review} track={review.track} key={review.id} />
                        })
                        :
                        Array.from({ length: 5 }).map((_, index) => {
                            return <ReviewCardSkeleton key={index} />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
