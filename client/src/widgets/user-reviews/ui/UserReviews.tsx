import { TrackCard, TrackCardSekelton } from "@/entities/track"
import { Slider, Title } from "@/shared/ui"
import styles from "./UserReviews.module.scss"
import { FC, useEffect } from "react"
import { IUser } from "@/entities/user"
import { IReview } from "@/entities/review"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { getUserReviewsThunk, selectUserReviews, selectUserReviewsStatus } from "@/features/user"

interface UserReviewsProps {
    user: IUser
}

export const UserReviews: FC<UserReviewsProps> = ({ user }) => {

    const dispatch = useAppDispatch()
    const reviews = useAppSelector(selectUserReviews)
    const reviewsStatus = useAppSelector(selectUserReviewsStatus)

    useEffect(() => {
        dispatch(getUserReviewsThunk({ page: 1, limit: 15, id: user.id }))
    }, [user])

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title link={`/user/${user?.username}/reviews`} linkTitle={'Показать все'}>НЕДАВНИЕ ОЦЕНКИ</Title>
                <Slider>
                    {
                        reviewsStatus === 'success' && reviews
                        ?
                        <>
                        {
                            reviews.length > 0 ?
                            reviews.map((review: IReview) => {
                                if (review.track) return <TrackCard key={review.id} review={review} track={review.track} />
                            })
                            :
                            <>Пользователь ничего не оценил</>
                        }
                        </>
                        :
                        Array.from({ length: 5 }).map((_, index) => {
                            return <TrackCardSekelton key={index} />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
