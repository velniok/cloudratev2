import { Link, useLocation } from "react-router-dom"
import styles from "./Sidebar.module.scss"
import { AdminPanel, Button, HomeIcon, InfoIcon, LogoIcon, LogoutIcon, NewsIcon, ProfileIcon, SearchIcon } from "../../../shared/ui"
import { useAppDispatch, useAppSelector } from "../../../shared/lib"
import { selectAuthStatus, selectAuthUser } from "../../../features/auth"
import { logout } from "../../../features/auth"

export const Sidebar = () => {

    const dispatch = useAppDispatch()
    const authStatus = useAppSelector(selectAuthStatus)
    const authUser = useAppSelector(selectAuthUser)

    const pathname = useLocation().pathname

    return (
        <aside className={styles.sidebar}>
            <Link to={'/'} className={styles.logo}>
                <LogoIcon width="24px" height="24px" />
                <h1 className={styles.logo__text}>CLOUDRATE</h1>
            </Link>
            <nav className={styles.nav}>
                <h2 className={styles.nav__title}>Обзор</h2>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item} ${ pathname === '/' ? styles.active : ''}`}>
                        <Link to={'/'} className={styles.nav__link}>
                            <HomeIcon />
                            Лента
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/artist' ? styles.active : ''}`}>
                        <Link to={'/artist'} className={styles.nav__link}>
                            <SearchIcon />
                            Поиск
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/track' ? styles.active : ''}`}>
                        <Link to={'/track'} className={styles.nav__link}>
                            <NewsIcon />
                            Новости
                        </Link>
                    </li>
                </ul>
            </nav>
            <nav className={styles.navBottom}>
                <h2 className={styles.nav__title}>Библиотека</h2>
                {
                    authStatus === 'success' ?
                    <ul className={styles.nav__list}>
                        <li className={`${styles.nav__item} ${ pathname === `/user/${authUser?.id}` || pathname === `/user/${authUser?.id}/edit` ? styles.active : ''}`}>
                            <Link to={`/user/${authUser?.id}`} className={styles.nav__link}>
                                <ProfileIcon />
                                Профиль
                            </Link>
                        </li>
                        {
                            authUser?.role === 'admin' &&
                            <li className={`${styles.nav__item} ${ pathname === '/admin' ? styles.active : ''}`}>
                                <Link to={'/admin'} className={styles.nav__link}>
                                    <AdminPanel />
                                    Админ-панель
                                </Link>
                            </li>
                        }
                        <li className={styles.nav__item}>
                            <div onClick={() => dispatch(logout())} className={styles.nav__link}>
                                <LogoutIcon />
                                Выйти из аккаунта
                            </div>
                        </li>
                    </ul>
                    :
                    <div className={styles.nonAuth}>
                        <InfoIcon />
                        <p className={styles.nonAuth__text}>Войдите, чтобы сохранять оценки и управлять профилем</p>
                        <Link to={'/login'} className={styles.nonAuth__link}>
                            <Button color="accent" padding="14px 20px 10px 20px">Войти</Button>
                        </Link>
                    </div>
                }
            </nav>
        </aside>
    )
}
