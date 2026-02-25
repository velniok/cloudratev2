import { ChangeEvent, FC, ReactNode, useRef } from 'react'
import styles from './Modal.module.scss'
import { CloseIcon, ProfileIcon } from '../icon'
import { Title } from '../title'
import { Button } from '../button'
import { useNotification } from '@/shared/lib'
import { Input } from '../input'

interface ModalProps {
    modalOpen: boolean
    modalClose: () => void
    children: ReactNode
}

export const Modal: FC<ModalProps> = ({ modalOpen, modalClose, children }) => {

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
                    {children}
                </div>
            </div>
        </div>
    )
}
