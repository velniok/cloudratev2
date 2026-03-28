import { Link, useLocation } from "react-router-dom"
import styles from "./Sidebar.module.scss"
import { AdminPanelIcon, Button, HomeIcon, InfoIcon, LogoIcon, LogoutIcon, NewsIcon, ProfileIcon, SearchIcon } from "../../../shared/ui"
import { useAppDispatch, useAppSelector } from "../../../shared/lib"
import { logoutApi, selectAuthStatus, selectAuthUser } from "../../../features/auth"
import { logout } from "../../../features/auth"
import { FC } from "react"

interface SidebarProps {
    sidebar: boolean
    setSidebar: () => void
}

export const Sidebar: FC<SidebarProps> = ({ sidebar, setSidebar }) => {

    const dispatch = useAppDispatch()
    const authStatus = useAppSelector(selectAuthStatus)
    const authUser = useAppSelector(selectAuthUser)

    const pathname = useLocation().pathname

    return (
        <aside className={`${styles.sidebar} ${sidebar ? styles.active : ''}`}>
            <Link to={'/'} className={styles.logo} onClick={setSidebar}>
                <LogoIcon width="24px" height="24px" />
                <h1 className={styles.logo__text}>CLOUDRATE</h1>
            </Link>
            <nav className={styles.nav}>
                <h2 className={styles.nav__title}>Обзор</h2>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item} ${ pathname === '/' ? styles.active : ''}`}>
                        <Link to={'/'} className={styles.nav__link} onClick={setSidebar}>
                            <HomeIcon />
                            Лента
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/search' ? styles.active : ''}`}>
                        <Link to={'/search'} className={styles.nav__link} onClick={setSidebar}>
                            <SearchIcon />
                            Поиск
                        </Link>
                    </li>
                    {/* <li className={`${styles.nav__item} ${ pathname === '/news' ? styles.active : ''}`}>
                        <Link to={'/news'} className={styles.nav__link}>
                            <NewsIcon />
                            Новости
                        </Link>
                    </li> */}
                </ul>
            </nav>
            <nav className={styles.navBottom}>
                <h2 className={styles.nav__title}>Библиотека</h2>
                {
                    authStatus === 'success' ?
                    <ul className={styles.nav__list}>
                        <li className={`${styles.nav__item} ${ pathname === `/user/${authUser?.username}` || pathname === `/user/${authUser?.id}/edit` ? styles.active : ''}`}>
                            <Link to={`/user/${authUser?.username}`} className={styles.nav__link} onClick={setSidebar}>
                                <ProfileIcon />
                                Профиль
                            </Link>
                        </li>
                        {
                            authUser?.role === 'admin' &&
                            <li className={`${styles.nav__item} ${ pathname === '/admin' ? styles.active : ''}`}>
                                <Link to={'/admin'} className={styles.nav__link} onClick={setSidebar}>
                                    <AdminPanelIcon />
                                    Админ-панель
                                </Link>
                            </li>
                        }
                        <li className={styles.nav__item}>
                            <div onClick={() => {dispatch(logout()), logoutApi() }} className={styles.nav__link}>
                                <LogoutIcon />
                                Выйти из аккаунта
                            </div>
                        </li>
                    </ul>
                    :
                    <div className={styles.nonAuth}>
                        <InfoIcon />
                        <p className={styles.nonAuth__text}>Войдите, чтобы сохранять оценки и управлять профилем</p>
                        <Link to={'/login'} className={styles.nonAuth__link} onClick={setSidebar}>
                            <Button color="accent" padding="14px 20px 10px 20px">Войти</Button>
                        </Link>
                    </div>
                }
            </nav>
        </aside>
    )
}
