import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { BurgerIcon, Button, LogoIcon } from '@/shared/ui'
import { FC } from 'react'

interface HeaderProps {
    setSidebar: (prev: boolean) => void
    sidebar: boolean
}

export const Header: FC<HeaderProps> = ({ setSidebar, sidebar }) => {
    return (
        <header className={styles.header}>
            <Link to={'/'} className={styles.logo} onClick={() => setSidebar(false)}>
                <LogoIcon width="20px" height="20px" />
                <h1 className={styles.logo__text}>CLOUDRATE</h1>
            </Link>
            <Button color='default' padding='10px 10px 5px 10px' onClick={() => setSidebar(!sidebar)}><BurgerIcon /></Button>
        </header>
    )
}
