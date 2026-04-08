import { Link, useLocation } from 'react-router-dom'
import styles from './AdminSidebar.module.scss'
import { LogoIcon } from '@/shared/ui'
import { FC } from 'react'

interface AdminSidebarProps {
    sidebar: boolean
    setSidebar: () => void
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ sidebar, setSidebar }) => {
    const pathname = useLocation().pathname

    return (
        <aside className={`${styles.sidebar} ${sidebar ? styles.active : ''}`}>
            <Link to={'/'} className={styles.logo}>
                <LogoIcon width="24px" height="24px" />
                <h1 className={styles.logo__text}>CloudRate</h1>
            </Link>
            <nav className={styles.nav}>
                <h2 className={styles.nav__title}>Администрирование</h2>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item} ${ pathname === '/admin' ? styles.active : ''}`}>
                        <Link to={'/admin'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/admin' ? '-fill' : ''} ph-chart-bar`}></i>
                            Общая информация
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/users' ? styles.active : ''}`}>
                        <Link to={'/admin/users'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/admin/users' ? '-fill' : ''} ph-users`}></i>
                            Пользователи
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/artists' ? styles.active : ''}`}>
                        <Link to={'/admin/artists'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/admin/artists' ? '-fill' : ''} ph-user`}></i>
                            Артисты
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/tracks' ? styles.active : ''}`}>
                        <Link to={'/admin/tracks'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/admin/tracks' ? '-fill' : ''} ph-music-notes-simple`}></i>
                            Треки
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/tracks-suggestions' ? styles.active : ''}`}>
                        <Link to={'/admin/tracks-suggestions'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/admin/tracks-suggestions' ? '-fill' : ''} ph-music-notes-plus`}></i>
                            Заявки на трек
                        </Link>
                    </li>
                </ul>
            </nav>
            <nav className={styles.bottom}>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item}`}>
                        <Link to={'/'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/' ? '-fill' : ''} ph-house`}></i>
                            Вернуться на Главную
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
