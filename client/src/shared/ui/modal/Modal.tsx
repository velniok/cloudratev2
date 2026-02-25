import { FC, ReactNode } from 'react'
import styles from './Modal.module.scss'
import { CloseIcon } from '../icon'

interface ModalProps {
    modalOpen: boolean
    modalClose: () => void
    children: ReactNode
    modalTitle: string
    modalDesc: string
    width: string
}

export const Modal: FC<ModalProps> = ({ modalOpen, modalClose, children, modalTitle, modalDesc, width }) => {

    return (
        <div className={`${styles.modal} ${modalOpen ? styles.open : ''}`}>
            <div className={styles.modal__wrapper} style={{ width: width }}>
                <div className={styles.modal__header}>
                    <div className={styles.modal__headerText}>
                        <h3 className={styles.modal__headerTitle}>{modalTitle}</h3>
                        <p className={styles.modal__headerDesc}>{modalDesc}</p>
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
