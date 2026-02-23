import { Title } from '@/shared/ui'
import styles from './AdminGeneral.module.scss'

export const AdminGeneral = () => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>АДМИН-ПАНЕЛЬ</Title>
                <ul className={styles.statsList}>
                    <li className={styles.statsItem}>
                        <h3 className={styles.statsTitle}>Пользователи</h3>
                        <p className={styles.statsCount}>10</p>
                    </li>
                    <li className={styles.statsItem}>
                        <h3 className={styles.statsTitle}>Артисты</h3>
                        <p className={styles.statsCount}>13</p>
                    </li>
                    <li className={styles.statsItem}>
                        <h3 className={styles.statsTitle}>Треки</h3>
                        <p className={styles.statsCount}>24</p>
                    </li>
                    <li className={styles.statsItem}>
                        <h3 className={styles.statsTitle}>Оценки</h3>
                        <p className={styles.statsCount}>3</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
