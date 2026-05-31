import { FC } from 'react'
import styles from './UserFollowsPagination.module.scss'
import { IUser } from '@/entities/user'
import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import { useAppSelector, usePagination, useWindowWidth } from '@/shared/lib'
import { getUserFollowsThunk, selectUserFollows, selectUserFollowsPagination, selectUserFollowsStatus, toggleFollowThunk } from '@/features/user'
import { ArtistCard, ArtistCardSkeleton, ArtistRow, ArtistRowSkeleton } from '@/entities/artist'
import { FollowArtistToggle } from '@/features/artist'

interface UserFollowsPaginationProps {
    user: IUser
}

export const UserFollowsPagination: FC<UserFollowsPaginationProps> = ({ user }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getUserFollowsThunk, `/user/${user.username}/follows`, 16, user.id)

    const follows = useAppSelector(selectUserFollows)
    const followsStatus = useAppSelector(selectUserFollowsStatus)
    const followsPagination = useAppSelector(selectUserFollowsPagination)
    const { isMobile } = useWindowWidth()

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
                        followsStatus === 'success' && follows && followsPagination ?
                        <>
                        {
                            follows.length > 0 ?
                            <>
                            <p className={styles.text}>Показано {((followsPagination.page - 1) * limit) + 1}-{(limit * followsPagination.page)} из {followsPagination.total}</p>
                            <ul className={`${styles.list} ${isMobile ? styles.row : ''}`}>
                            {
                                follows.map((artist) => {
                                    if (isMobile) {
                                        return <ArtistRow artist={artist} key={artist.id} action={<FollowArtistToggle thunk={toggleFollowThunk} isFollowed={artist.follow?.isFollowed ?? false} artistId={artist.id} />} />
                                    } else {
                                        return <ArtistCard artist={artist} key={artist.id} />
                                    }
                                })
                            }
                            </ul>
                            <div className={styles.bottom}>
                                <PaginationButtons
                                    page={followsPagination.page}
                                    totalPages={followsPagination.totalPages}
                                    hundleNextPage={hundleNextPage}
                                    hundlePrevPage={hundlePrevPage}
                                    hundlePage={hundlePage}
                                />
                            </div>
                            </>
                            :
                            <p className={styles.none}>Подписок нет</p>
                        }
                        </>
                        :
                        <ul className={`${styles.list} ${isMobile ? styles.row : ''}`}>
                            {
                                Array.from({ length: 10 }).map((_, index) => {
                                    if (isMobile) {
                                        return <ArtistRowSkeleton key={index} />
                                    } else {
                                        return <ArtistCardSkeleton key={index} />
                                    }
                                })
                            }
                        </ul>
                    }
            </div>
        </div>
    )
}
