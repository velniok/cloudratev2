import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import styles from './UserReviews.module.scss'
import { FC } from 'react'
import { IUser } from '@/entities/user'
import { useAppSelector, usePagination } from '@/shared/lib'
import { TrackCard, TrackCardSekelton } from '@/entities/track'
import { getUserReviewsThunk, selectUserReviews, selectUserReviewsPagination, selectUserReviewsStatus } from '@/features/user'

interface UserReviewsProps {
    user: IUser
}

export const UserReviews: FC<UserReviewsProps> = ({ user }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getUserReviewsThunk, `/user/${user.username}/reviews`, 10, user.id)
    const reviewList = useAppSelector(selectUserReviews)
    const reviewListPagination = useAppSelector(selectUserReviewsPagination)
    const reviewListStatus = useAppSelector(selectUserReviewsStatus)

    const links = [
        {
            title: 'Профиль',
            link: `/user/${user.username}`
        },
        {
            title: 'Оценки',
            link: 'last'
        }
    ]

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <LinksList links={links} />
                <Title>Все оценки {user?.nickname}</Title>
                    {
                        reviewListStatus === 'success' ?
                        <>
                        {
                            reviewList.length > 0 ?
                            <>
                            <p className={styles.text}>Показано {((+reviewListPagination?.page - 1) * limit) + 1}-{(limit * +reviewListPagination?.page)} из {+reviewListPagination?.total}</p>
                            <ul className={styles.list}>
                            {
                                reviewList.map((review) => {
                                    return <TrackCard track={review.track} key={review.id} review={review} />
                                })
                            }
                            </ul>
                            <div className={styles.bottom}>
                                <PaginationButtons
                                    page={+reviewListPagination.page}
                                    totalPages={reviewListPagination.totalPages}
                                    hundleNextPage={hundleNextPage}
                                    hundlePrevPage={hundlePrevPage}
                                    hundlePage={hundlePage}
                                />
                            </div>
                            </>
                            :
                            <>Этот пользователь еще не оценил трек</>
                        }
                        </>
                        :
                        <ul className={styles.list}>
                            {
                                Array.from({ length: 10 }).map((_, index) => {
                                    return <TrackCardSekelton key={index} />
                                })
                            }
                        </ul>
                    }
            </div>
        </div>
    )
}