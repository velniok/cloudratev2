import { Button, InfoIcon } from '@/shared/ui'
import styles from './TrackDeleteModal.module.scss'
import { FC, MouseEvent } from 'react'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { deleteTrackThunk } from '../model/slice'
import { useNavigate } from 'react-router-dom'

interface TrackDeleteModalProps {
    modalClose: () => void
    trackId: number
    trackListLength: number
    lastPage: number
    limit: number
}

export const TrackDeleteModal: FC<TrackDeleteModalProps> = ({ modalClose, trackId, trackListLength, lastPage, limit }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const hundleSumbit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteTrackThunk({ id: trackId })).unwrap()
            .then(() => {
                notify('Трек удалён', 'Трек успешно удалён', 'delete')
                if (trackListLength === 1) {
                    navigate(`/admin/tracks?page=${lastPage - 1}&limit=${limit}`)
                }
                modalClose()
            })
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }

    return (
        <>
            <div className={styles.wrapper}>
                <InfoIcon />
                <p className={styles.text}>Трек и все связанные данные будут <strong className={styles.strong}>безвозвратно удалены</strong>. Рейтинги и история активности также будут удалены.</p>
            </div>
            <div className={styles.footer}>
                <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={modalClose}>ОТМЕНА</Button>
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={hundleSumbit}>ДА, УДАЛИТЬ</Button>
            </div>
        </>
    )
}
