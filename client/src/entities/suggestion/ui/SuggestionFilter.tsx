import { FC } from 'react'
import styles from './SuggestionFilter.module.scss'

interface SuggestionFilterProps {
    setFilterStatus: (status: string) => void
    filterStatus: string
}

export const SuggestionFilter: FC<SuggestionFilterProps> = ({ setFilterStatus, filterStatus }) => {
    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                <li className={`${styles.item} ${filterStatus === 'all' ? styles.active : ''}`} onClick={() => setFilterStatus('all')}>Все заявки</li>
                <li className={`
                        ${styles.item}
                        ${styles.pending}
                        ${filterStatus === 'pending' ? styles.active : ''}
                    `} 
                    onClick={() => setFilterStatus('pending')}>На рассмотрении</li>
                <li className={`
                        ${styles.item}
                        ${styles.accepted}
                        ${filterStatus === 'accepted' ? styles.active : ''}
                    `}
                    onClick={() => setFilterStatus('accepted')}>Одобрено</li>
                <li className={`
                        ${styles.item}
                        ${styles.rejected}
                        ${filterStatus === 'rejected' ? styles.active : ''}
                    `}
                    onClick={() => setFilterStatus('rejected')}>Отклонено</li>
            </ul>
        </div>
    )
}
