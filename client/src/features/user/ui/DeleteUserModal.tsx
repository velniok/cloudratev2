import { Button, InfoIcon } from '@/shared/ui'
import styles from './DeleteUserModal.module.scss'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { FC, MouseEvent } from 'react'
import { deleteUserThunk } from '../model/slice'

interface DeleteUserModalProps {
    modalClose: () => void
    userId: number
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({ userId, modalClose }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()

    const hundleSumbit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteUserThunk({ id: userId })).unwrap()
            .then(() => {
                notify('Пользователь удалён', 'Пользователь успешно удалён', 'delete')
                modalClose()
            })
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }

    return (
        <>
            <div className={styles.wrapper}>
                <InfoIcon />
                <p className={styles.text}>Пользователь и все связанные данные будут <strong className={styles.strong}>безвозвратно удалены</strong>. Оценки и история активности также будут удалены.</p>
            </div>
            <div className={styles.footer}>
                <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={modalClose}>ОТМЕНА</Button>
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={hundleSumbit}>ДА, УДАЛИТЬ</Button>
            </div>
        </>
    )
}
