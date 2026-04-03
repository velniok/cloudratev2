import styles from './FollowArtistToggle.module.scss'
import { Button } from '@/shared/ui'
import { MouseEvent, useState, type FC } from 'react'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { toggleFollowThunk } from '../model/slice'
import { selectAuthUser } from '@/features/auth'

interface FollowArtistToggleProps {
    isFollowed: boolean
    artistId: number
    thunk: ( params: { artistId: number, userId: number } ) => any
}

export const FollowArtistToggle: FC<FollowArtistToggleProps> = ({ isFollowed, artistId, thunk }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const authUser = useAppSelector(selectAuthUser)

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [followLoading, setFollowLoading] = useState<boolean>(false)

    const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (followLoading) return false
        if (!authUser?.id) return notify('Вы не авторизованы', 'Прежде чем сделать это, авторизуйтесь', 'error')

        setFollowLoading(true)
        dispatch(thunk({
            artistId: artistId,
            userId: authUser?.id
        })).unwrap()
            .then((res) => {
                if (res.followed) {
                    notify('Вы подписались', 'Вы успешно подписались на артиста', 'success')
                } else {
                    notify('Вы отписались', 'Вы успешно отписались от артиста', 'delete')
                }
                setFollowLoading(false)
            })
    }

    return (
        <>
        {
            isFollowed ?
            <>
                <Button onClick={onSubmit} padding='12px 24px 8px 24px' color='accent' setIsHovered={setIsHovered} className={styles.button__desc}>
                    {
                        followLoading ? 'Загрузка..' : <>{ isHovered ? 'Отписаться' : 'Вы подписаны' }</>
                    }
                </Button>
                <Button onClick={onSubmit} padding='12px 24px 8px 24px' color='accent' className={styles.button__mobile}>
                    {
                        followLoading ? 'Загрузка..' : 'Вы подписаны'
                    }
                </Button>
            </>
            :
            <Button onClick={onSubmit} padding='12px 24px 8px 24px' className={styles.button} color='white'>
                {
                    followLoading ? 'Загрузка..' : 'Подписаться'
                }
            </Button>
        }
        </>
    )
}
