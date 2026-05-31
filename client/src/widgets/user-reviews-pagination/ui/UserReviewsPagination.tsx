import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import styles from './UserReviewsPagination.module.scss'
import { FC } from 'react'
import { IUser } from '@/entities/user'
import { useAppSelector, usePagination, useWindowWidth } from '@/shared/lib'
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
    const { isMobile } = useWindowWidth()

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
                        reviewListStatus === 'success' && reviewList && reviewListPagination ?
                        <>
                        {
                            reviewList.length > 0 ?
                            <>
                            <p className={styles.text}>Показано {((reviewListPagination.page - 1) * limit) + 1}-{(limit * reviewListPagination.page)} из {reviewListPagination.total}</p>
                            <ul className={`${styles.list} ${isMobile ? styles.row : ''}`}>
                            {
                                reviewList.map((review) => {
                                    if (isMobile) {
                                        if (review.track) return <TrackRow track={review.track} key={review.id} review={review} />
                                    } else {
                                        if (review.track) return <TrackCard track={review.track} key={review.id} review={review} />
                                    }
                                })
                            }
                            </ul>
                            <div className={styles.bottom}>
                                <PaginationButtons
                                    page={reviewListPagination.page}
                                    totalPages={reviewListPagination.totalPages}
                                    hundleNextPage={hundleNextPage}
                                    hundlePrevPage={hundlePrevPage}
                                    hundlePage={hundlePage}
                                />
                            </div>
                            </>
                            :
                            <p className={styles.none}>Оценок нет</p>
                        }
                        </>
                        :
                        <ul className={`${styles.list} ${isMobile ? styles.row : ''}`}>
                            {
                                Array.from({ length: 10 }).map((_, index) => {
                                    if (isMobile) {
                                        return <TrackRowSkelton key={index} review />
                                    } else {
                                        return <TrackCardSekelton key={index} />
                                    }
                                })
                            }
                        </ul>
                    }
            </div>
        </div>
    )
}