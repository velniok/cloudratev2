import { LogoIcon } from '@/shared/ui'
import styles from './Footer.module.scss'

export const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <LogoIcon width="24px" height="24px" />
                        <h1 className={styles.logo__text}>CloudRate</h1>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p className={styles.copyright}>© 2026 CloudRate. Все права защищены.</p>
                    <ul className={styles.legal}>
                        <li className={styles.legal__item}>Политика конфиденциальности</li>
                        <li className={styles.legal__item}>Условия использования</li>
                        <li className={styles.legal__item}>Обратная связь</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
