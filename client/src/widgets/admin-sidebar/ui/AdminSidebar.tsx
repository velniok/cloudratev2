import { Link, useLocation } from 'react-router-dom'
import styles from './AdminSidebar.module.scss'
import { DashboardIcon, HomeIcon, LogoIcon, ProfileIcon, TrackIcon, UsersIcon } from '@/shared/ui'
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
                <h1 className={styles.logo__text}>CLOUDRATE</h1>
            </Link>
            <nav className={styles.nav}>
                <h2 className={styles.nav__title}>Администрирование</h2>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item} ${ pathname === '/admin' ? styles.active : ''}`}>
                        <Link to={'/admin'} className={styles.nav__link} onClick={setSidebar}>
                            <DashboardIcon />
                            Общая информация
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/users' ? styles.active : ''}`}>
                        <Link to={'/admin/users'} className={styles.nav__link} onClick={setSidebar}>
                            <UsersIcon />
                            Пользователи
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/artists' ? styles.active : ''}`}>
                        <Link to={'/admin/artists'} className={styles.nav__link} onClick={setSidebar}>
                            <ProfileIcon />
                            Артисты
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/admin/tracks' ? styles.active : ''}`}>
                        <Link to={'/admin/tracks'} className={styles.nav__link} onClick={setSidebar}>
                            <TrackIcon />
                            Треки
                        </Link>
                    </li>
                </ul>
            </nav>
            <nav className={styles.navBottom}>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item}`}>
                        <Link to={'/'} className={styles.nav__link} onClick={setSidebar}>
                            <HomeIcon />
                            Вернуться в Ленту
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
