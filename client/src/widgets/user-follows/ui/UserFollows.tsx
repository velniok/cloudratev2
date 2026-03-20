import { FC } from 'react'
import styles from './UserFollows.module.scss'
import { IUser } from '@/entities/user'
import { TStatus } from '@/shared/types'
import { Slider, Title } from '@/shared/ui'
import { ArtistCard, ArtistCardSkeleton } from '@/entities/artist'

interface UserFollowsProps {
    user: IUser
    userStatus: TStatus
}

export const UserFollows: FC<UserFollowsProps> = ({ user, userStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПОДПИСКИ</Title>
                <Slider>
                    {
                        userStatus === 'success' ?
                        <>
                        {
                            user.follows?.length > 0 ?
                            user.follows.map((artist) => {
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
