import { Slider, Title } from '@/shared/ui'
import styles from './NewReviews.module.scss'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { getNewReviewsThunk, selectNewReviews, selectNewReviewsStatus } from '@/features/home'
import { IReview, ReviewCard, ReviewCardSkeleton } from '@/entities/review'
import { ReviewLikeToggle } from '@/features/review'

export const NewReviews = () => {

    const dispatch = useAppDispatch()
    const newReviews = useAppSelector(selectNewReviews)
    const newReviewsStatus = useAppSelector(selectNewReviewsStatus)

    const [chunk, setChunk] = useState<IReview[][]>([])

    const chunkArray = (arr: IReview[], size: number) => {
        return arr.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(arr.slice(i, i + size))
            return acc
        }, [] as IReview[][])
    }

    useEffect(() => {
        dispatch(getNewReviewsThunk()).unwrap()
            .then((res) => {
                setChunk(prev => prev = chunkArray(res.reviews, 3))
            })
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>НОВЫЕ ОТЗЫВЫ</Title>
                <Slider columns={true}>
                    {
                        newReviewsStatus === 'success' ?
                        chunk.map((group, index) => {
                            return (
                                <ul key={index}>
                                    {
                                        group.map((review) => {
                                            return (
                                                <li key={review.id}>
                                                    <ReviewCard showMore={true} review={review} track={review.track} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
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
