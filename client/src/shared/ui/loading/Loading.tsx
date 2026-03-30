import styles from './Loading.module.scss'

export const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <ul className={styles.wave__list}>
                    <li className={styles.wave__item}></li>
                    <li className={styles.wave__item}></li>
                    <li className={styles.wave__item}></li>
                    <li className={styles.wave__item}></li>
                    <li className={styles.wave__item}></li>
                </ul>
                <h2 className={styles.title}>
                    ЗАГРУЗКА
                    <ul className={styles.dot__list}>
                        <li className={styles.dot__item}>.</li>
                        <li className={styles.dot__item}>.</li>
                        <li className={styles.dot__item}>.</li>
                    </ul>
                </h2>
            </div>
        </div>
    )
}
