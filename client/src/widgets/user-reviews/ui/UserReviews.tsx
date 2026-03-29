import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import styles from './UserReviews.module.scss'
import { FC } from 'react'
import { IUser } from '@/entities/user'
import { useAppSelector, usePagination } from '@/shared/lib'
import { getUserReviewsThunk, selectReviewList, selectReviewListPagination, selectReviewListStatus } from '@/features/review'
import { TrackCard, TrackCardSekelton } from '@/entities/track'

interface UserReviewsProps {
    user: IUser
}

export const UserReviews: FC<UserReviewsProps> = ({ user }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getUserReviewsThunk, `/user/${user.username}/reviews`, 10, { userId: user.id })
    const reviewList = useAppSelector(selectReviewList)
    const reviewListPagination = useAppSelector(selectReviewListPagination)
    const reviewListStatus = useAppSelector(selectReviewListStatus)

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
                <p className={styles.text}>Показано {((+reviewListPagination?.page - 1) * limit) + 1}-{(limit * +reviewListPagination?.page)} из {+reviewListPagination?.total}</p>
                <ul className={styles.list}>
                    {
                        reviewListStatus === 'success' ?
                        reviewList.map((review) => {
                            return <TrackCard track={review.track} key={review.id} review={review} />
                        })
                        :
                        Array.from({ length: 10 }).map((_, index) => {
                            return <TrackCardSekelton key={index} />
                        })
                    }
                </ul>
                <div className={styles.bottom}>
                    {
                        reviewListStatus === 'success' &&
                        <PaginationButtons
                            page={+reviewListPagination.page}
                            totalPages={reviewListPagination.totalPages}
                            hundleNextPage={hundleNextPage}
                            hundlePrevPage={hundlePrevPage}
                            hundlePage={hundlePage}
                        />
                    }
                </div>
            </div>
        </div>
    )
}