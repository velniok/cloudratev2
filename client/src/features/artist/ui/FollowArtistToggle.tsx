import styles from './FollowArtistToggle.module.scss'
import { Button } from '@/shared/ui'
import { useState, type FC } from 'react'
import { toggleFollowApi } from '../api/artistApi'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { toggleFollowThunk } from '../model/slice'
import { selectAuthUser } from '@/features/auth'

interface FollowArtistToggleProps {
    isFollowed: boolean
    artistId: number
}

export const FollowArtistToggle: FC<FollowArtistToggleProps> = ({ isFollowed, artistId }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const authUser = useAppSelector(selectAuthUser)

    const [isHovered, setIsHovered] = useState<boolean>(false)

    const onSubmit = () => {

        if (!authUser?.id) return notify('Вы не авторизованы', 'Прежде чем сделать это, авторизуйтесь', 'error')

        dispatch(toggleFollowThunk({
            artistId: artistId,
            userId: authUser?.id
        })).unwrap()
            .then((res) => {
                if (res.followed) {
                    notify('Вы подписались', 'Вы успешно подписались на артиста', 'success')
                } else {
                    notify('Вы отписались', 'Вы успешно отписались от артиста', 'delete')
                }
            })
    }

    return (
        <>
        {
            isFollowed ?
            <>
                <Button onClick={onSubmit} padding='12px 24px 8px 24px' color='accent' setIsHovered={setIsHovered} className={styles.button__desc}>
                    {
                        isHovered ? 'Отписаться' : 'Вы подписаны'
                    }
                </Button>
                <Button onClick={onSubmit} padding='12px 24px 8px 24px' color='accent' className={styles.button__mobile}>
                    Вы подписаны
                </Button>
            </>
            :
            <Button onClick={onSubmit} padding='12px 24px 8px 24px' className={styles.button} color='white'>Подписаться</Button>
        }
        </>
    )
}
