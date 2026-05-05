import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./Sidebar.module.scss"
import { AdminPanelIcon, Badges, Button, Cover, HomeIcon, InfoIcon, LogoIcon, LogoutIcon, NewsIcon, ProfileIcon, SearchIcon } from "../../../shared/ui"
import { getOptimizedAvatar, useAppDispatch, useAppSelector } from "../../../shared/lib"
import { logoutApi, selectAuthStatus, selectAuthUser } from "../../../features/auth"
import { logout } from "../../../features/auth"
import { FC, useEffect, useState } from "react"

interface SidebarProps {
    sidebar: boolean
    setSidebar: () => void
}

export const Sidebar: FC<SidebarProps> = ({ sidebar, setSidebar }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const authStatus = useAppSelector(selectAuthStatus)
    const authUser = useAppSelector(selectAuthUser)

    const [openUser, setOpenUser] = useState<boolean>(false)

    const pathname = useLocation().pathname

    useEffect(() => {
        document.addEventListener('click', () => setOpenUser(false))
        return () => {
            document.addEventListener('click', () => setOpenUser(false))
        }
    }, [])

    return (
        <aside className={`${styles.sidebar} ${sidebar ? styles.active : ''}`}>
            <Link to={'/'} className={styles.logo} onClick={setSidebar}>
                <LogoIcon width="24px" height="24px" />
                <h1 className={styles.logo__text}>CloudRate</h1>
            </Link>
            <nav className={styles.nav}>
                <h2 className={styles.nav__title}>Обзор</h2>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item} ${ pathname === '/' ? styles.active : ''}`}>
                        <Link to={'/'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/' ? '-fill' : ''} ph-house`}></i>
                            Главная
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${ pathname === '/search' ? styles.active : ''}`}>
                        <Link to={'/search'} className={styles.nav__link} onClick={setSidebar}>
                            <i className={`ph${pathname === '/search' ? '-fill' : ''} ph-magnifying-glass`}></i>
                            Поиск
                        </Link>
                    </li>
                </ul>
            </nav>
            {
                authUser?.role === 'admin' &&
                    <nav className={styles.nav}>
                        <h2 className={styles.nav__title}>Админ</h2>
                        <ul className={styles.nav__list}>
                            <li className={`${styles.nav__item} ${ pathname === '/admin' ? styles.active : ''}`}>
                                <Link to={'/admin'} className={styles.nav__link} onClick={setSidebar}>
                                    <i className={`ph${pathname === '/admin' ? '-fill' : ''} ph-shield`}></i>
                                    Админ-панель
                                </Link>
                            </li>
                        </ul>
                    </nav>
            }
            {
                authStatus === 'success' &&
                    <nav className={styles.nav}>
                        <h2 className={styles.nav__title}>Профиль</h2>
                        <ul className={styles.nav__list}>
                            <li className={`${styles.nav__item} ${ pathname === `/user/${authUser?.username}` || pathname === `/user/${authUser?.id}/edit` ? styles.active : ''}`}>
                                <Link to={`/user/${authUser?.username}`} className={styles.nav__link} onClick={setSidebar}>
                                    <i className={`ph${pathname === `/user/${authUser?.username}` ? '-fill' : ''} ph-user`}></i>
                                    Мой профиль
                                </Link>
                            </li>
                            <li className={`${styles.nav__item} ${ pathname === `/user/${authUser?.username}/reviews` ? styles.active : ''}`}>
                                <Link to={`/user/${authUser?.username}/reviews`} className={styles.nav__link} onClick={setSidebar}>
                                    <i className={`ph${pathname === `/user/${authUser?.username}/reviews` ? '-fill' : ''} ph-star`}></i>
                                    Мои оценки
                                </Link>
                            </li>
                            <li className={`${styles.nav__item} ${ pathname === `/user/${authUser?.username}/follows` ? styles.active : ''}`}>
                                <Link to={`/user/${authUser?.username}/follows`} className={styles.nav__link} onClick={setSidebar}>
                                    <i className={`ph${pathname === `/user/${authUser?.username}/follows` ? '-fill' : ''} ph-users`}></i>
                                    Мои подписки
                                </Link>
                            </li>
                            <li className={`${styles.nav__item} ${ pathname === `/user/${authUser?.username}/track-suggestions` ? styles.active : ''}`}>
                                <Link to={`/user/${authUser?.username}/track-suggestions`} className={styles.nav__link} onClick={setSidebar}>
                                    <i className={`ph${pathname === `/user/${authUser?.username}/track-suggestions` ? '-fill' : ''} ph-file-text`}></i>
                                    Мои заявки
                                </Link>
                            </li>
                            <li className={`${styles.nav__item} ${ pathname === '/track-suggestion' ? styles.active : ''}`}>
                                <Link to='/track-suggestion' className={styles.nav__link} onClick={setSidebar}>
                                    <i className={`ph${pathname === '/track-suggestion' ? '-fill' : ''} ph-music-notes-plus`}></i>
                                    Предложить трек
                                </Link>
                            </li>
                        </ul>
                    </nav>
            }
            <div className={styles.bottom}>
                {
                    authStatus === 'success' && authUser ?
                    <>
                        <div className={`${styles.user__info} ${openUser ? styles.open : ''}`}>
                            <ul className={styles.user__infoList}>
                                <li className={styles.user__infoItem} onClick={() => {navigate(`/user/${authUser?.username}/edit`); setSidebar()}}>
                                    <i className="ph ph-gear"></i>
                                    Настройки
                                </li>
                                <li className={styles.user__infoItem} onClick={() => {navigate(`/user/${authUser?.username}`); setSidebar()}}>
                                    <i className="ph ph-user"></i>
                                    Профиль
                                </li>
                                <li className={`${styles.user__infoItem} ${styles.logout}`} onClick={() => {dispatch(logout()), logoutApi(), setSidebar() }}>
                                    <i className="ph ph-sign-out"></i>
                                    Выйти
                                </li>
                            </ul>
                        </div>
                        <div className={styles.bottom__inner} onClick={(e) => {e.stopPropagation(); setOpenUser(!openUser)}}>
                            <div className={styles.user}>
                                <Cover url={getOptimizedAvatar(authUser.avatarUrl ?? '')} width="40px" height="40px" borderRadius="50%" />
                                <div className={styles.user__bio}>
                                    <h3 className={styles.user__nickname}>{authUser.nickname}</h3>
                                    {
                                        authUser.role !== 'user' && <Badges size='small' role={authUser.role} />
                                    }
                                </div>
                            </div>
                            <i className={`ph ph-dots-three ${styles.user__more}`}></i>
                        </div>
                    </>
                    :
                    <div className={styles.nonAuth}>
                        <i className="ph ph-info"></i>
                        <p className={styles.nonAuth__text}>Войдите, чтобы сохранять оценки и управлять профилем</p>
                        <Link to={'/login'} className={styles.nonAuth__link} onClick={setSidebar}>
                            <Button color="accent" padding="14px 20px 10px 20px">Войти</Button>
                        </Link>
                    </div>
                    
                }
            </div>
        </aside>
    )
}
