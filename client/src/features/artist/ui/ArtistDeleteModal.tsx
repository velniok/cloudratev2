import { Button, InfoIcon } from '@/shared/ui'
import styles from './ArtistDeleteModal.module.scss'
import { FC, MouseEvent } from 'react'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { deleteArtistThunk } from '../model/slice'
import { useNavigate } from 'react-router-dom'

interface ArtistDeleteModalProps {
    modalClose: () => void
    artistId: number
    lastPage: number
    limit: number
    artistListLength: number
}

export const ArtistDeleteModal: FC<ArtistDeleteModalProps> = ({ modalClose, artistId, lastPage, limit, artistListLength }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const hundleSumbit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteArtistThunk({ id: artistId })).unwrap()
            .then(() => {
                notify('Артист удалён', 'Артист успешно удалён', 'delete')
                if (artistListLength === 1) {
                    navigate(`/admin/artists?page=${lastPage - 1}&limit=${limit}`)
                }
                modalClose()
            })
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }

    return (
        <>
            <div className={styles.wrapper}>
                <InfoIcon />
                <p className={styles.text}>Артист и все связанные данные будут <strong className={styles.strong}>безвозвратно удалены</strong>. Треки, рейтинги и история активности также будут удалены.</p>
            </div>
            <div className={styles.footer}>
                <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={modalClose}>ОТМЕНА</Button>
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={hundleSumbit}>ДА, УДАЛИТЬ</Button>
            </div>
        </>
    )
}
