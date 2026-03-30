import { FC, useEffect } from 'react'
import styles from './UserFollows.module.scss'
import { IUser } from '@/entities/user'
import { Slider, Title } from '@/shared/ui'
import { ArtistCard, ArtistCardSkeleton } from '@/entities/artist'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { getUserFollowsThunk } from '@/features/user/model/slice'
import { selectUserFollows, selectUserFollowsStatus } from '@/features/user/model/selectors'

interface UserFollowsProps {
    user: IUser
}

export const UserFollows: FC<UserFollowsProps> = ({ user }) => {

    const dispatch = useAppDispatch()
    const follows = useAppSelector(selectUserFollows)
    const followsStatus = useAppSelector(selectUserFollowsStatus)

    useEffect(() => {
        dispatch(getUserFollowsThunk({ page: 1, limit: 15, id: user.id }))
    }, [user])

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПОДПИСКИ</Title>
                <Slider>
                    {
                        followsStatus === 'success' ?
                        <>
                        {
                            follows.length > 0 ?
                            follows.map((artist) => {
                                return <ArtistCard artist={artist} key={artist.id} />
                            })
                            :
                            <>Подписок нет</>
                        }
                        </>
                        :
                        Array.from({ length: 5 }).map((_, index) => {
                            return <ArtistCardSkeleton key={index} />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
