import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import styles from './UserReviewsPagination.module.scss'
import { FC } from 'react'
import { IUser } from '@/entities/user'
import { useAppSelector, usePagination } from '@/shared/lib'
import { TrackCard, TrackCardSekelton, TrackRow, TrackRowSkelton } from '@/entities/track'
import { getUserReviewsThunk, selectUserReviews, selectUserReviewsPagination, selectUserReviewsStatus } from '@/features/user'

interface UserReviewsPaginationProps {
    user: IUser
}

export const UserReviewsPagination: FC<UserReviewsPaginationProps> = ({ user }) => {

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
                <Title>ВСЕ ОЦЕНКИ {user?.nickname}</Title>
                    {
                        reviewListStatus === 'success' ?
                        <>
                        {
                            reviewList.length > 0 ?
                            <>
                            <p className={styles.text}>Показано {((+reviewListPagination?.page - 1) * limit) + 1}-{(limit * +reviewListPagination?.page)} из {+reviewListPagination?.total}</p>
                            <ul className={`${styles.list} ${window.innerWidth <= 767 ? styles.row : ''}`}>
                            {
                                reviewList.map((review) => {
                                    if (window.innerWidth > 767) {
                                        return <TrackCard track={review.track} key={review.id} review={review} />
                                    } else {
                                        return <TrackRow track={review.track} key={review.id} review={review} />
                                    }
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
                        <ul className={`${styles.list} ${window.innerWidth <= 767 ? styles.row : ''}`}>
                            {
                                Array.from({ length: 10 }).map((_, index) => {
                                    if (window.innerWidth > 767) {
                                        return <TrackCardSekelton key={index} />
                                    } else {
                                        return <TrackRowSkelton key={index} review />
                                    }
                                })
                            }
                        </ul>
                    }
            </div>
        </div>
    )
}