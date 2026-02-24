import { ChangeEvent, FC, useRef } from 'react'
import styles from './Modal.module.scss'
import { CloseIcon, ProfileIcon } from '../icon'
import { Title } from '../title'
import { Button } from '../button'
import { useNotification } from '@/shared/lib'
import { Input } from '../input'

interface ModalProps {
    modalOpen: boolean
    modalClose: () => void
}

export const Modal: FC<ModalProps> = ({ modalOpen, modalClose }) => {

    const { notify } = useNotification()

    const inputRef = useRef<HTMLInputElement>(null)
    
    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log(file)
    }

    return (
        <div className={`${styles.modal} ${modalOpen ? styles.open : ''}`}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__header}>
                    <div className={styles.modal__headerText}>
                        <h3 className={styles.modal__headerTitle}>НОВЫЙ АРТИСТ</h3>
                        <p className={styles.modal__headerDesc}>Заполните информацию об артисте</p>
                    </div>
                    <div className={styles.modal__close} onClick={modalClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className={styles.modal__content}>
                    <form className={styles.form}>
                    <div className={styles.editAvatar}>
                        <div className={styles.avatar}>
                            <ProfileIcon />
                        </div>
                        <div className={styles.avatarInput}>
                            <input ref={inputRef} hidden type="file" onChange={hundleAvatarChange} />
                            <Button fontSize='12px' color='default' padding='12px 16px 8px 16px' onClick={() => inputRef.current?.click()}>Загрузить новое фото</Button>
                            <p className={styles.sub}>JPG, PNG. До 5MB</p>
                        </div>
                    </div>
                    <Input
                        label='НИКНЕЙМ АРТИСТА'
                        placeholder='Введите никнейм артиста'
                        type='text'
                        labelFontSize='10px'
                        inputFontSize='14px'
                        isGray={true}
                    />
                    </form>
                </div>
                <div className={styles.modal__footer}>
                    <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={modalClose}>ОТМЕНА</Button>
                    <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={() => {notify('Артист создан', 'Новый артист успешно добавлен', 'success'); modalClose()}}>СОЗДАТЬ АРТИСТА</Button>
                </div>
            </div>
        </div>
    )
}
