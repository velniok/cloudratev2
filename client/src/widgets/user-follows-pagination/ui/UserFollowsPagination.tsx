import { FC } from 'react'
import styles from './UserFollowsPagination.module.scss'
import { IUser } from '@/entities/user'
import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import { useAppSelector, usePagination } from '@/shared/lib'
import { getUserFollowsThunk, selectUserFollows, selectUserFollowsPagination, selectUserFollowsStatus } from '@/features/user'
import { ArtistCard, ArtistCardSkeleton } from '@/entities/artist'

interface UserFollowsPaginationProps {
    user: IUser
}

export const UserFollowsPagination: FC<UserFollowsPaginationProps> = ({ user }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getUserFollowsThunk, `/user/${user.username}/follows`, 16, user.id)

    const follows = useAppSelector(selectUserFollows)
    const followsStatus = useAppSelector(selectUserFollowsStatus)
    const followsPagination = useAppSelector(selectUserFollowsPagination)

    const links = [
        {
            title: 'Профиль',
            link: `/user/${user.username}`
        },
        {
            title: 'Подписки',
            link: 'last'
        }
    ]

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <LinksList links={links} />
                <Title>ВСЕ ПОДПИСКИ {user?.nickname}</Title>
                    {
                        followsStatus === 'success' ?
                        <>
                        {
                            follows.length > 0 ?
                            <>
                            <p className={styles.text}>Показано {((+followsPagination?.page - 1) * limit) + 1}-{(limit * +followsPagination?.page)} из {+followsPagination?.total}</p>
                            <ul className={styles.list}>
                            {
                                follows.map((artist) => {
                                    return <ArtistCard artist={artist} key={artist.id} />
                                })
                            }
                            </ul>
                            <div className={styles.bottom}>
                                <PaginationButtons
                                    page={+followsPagination.page}
                                    totalPages={followsPagination.totalPages}
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
                                    return <ArtistCardSkeleton key={index} />
                                })
                            }
                        </ul>
                    }
            </div>
        </div>
    )
}
