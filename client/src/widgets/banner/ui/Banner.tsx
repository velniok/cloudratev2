import { Badges, Button } from '@/shared/ui'
import styles from './Banner.module.scss'

export const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.beta}>БЕТА</div>
                    <h2 className={styles.title}>CloudRate в режиме бета-тестирования</h2>
                    <p className={styles.desc}>Мы активно работаем над улучшением платформы. Нашли баг или хотите предложить идею? Напишите нам в Telegram — мы читаем каждое сообщение.</p>
                    <div className={styles.badge}>
                        <Badges badge='beta' />
                        <p className={styles.desc}>
                            Оцените 1 трек с отзывом или 3 трека без отзыва, предложите 3 своих любымых трека и получите уникальный бейджик в свой профиль.
                        </p>
                    </div>
                    <a href="https://t.me/cloudrate_support" className={styles.link}>
                        <Button
                            color='default'
                            icon={<i className={`ph-fill ph-telegram-logo ${styles.icon}`}></i>}
                            padding='14px 20px 12px 20px'
                        >Написать в Telegram</Button>
                    </a>
                </div>
            </div>
        </section>
    )
}
