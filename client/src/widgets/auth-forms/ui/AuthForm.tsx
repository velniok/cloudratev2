import { Link } from "react-router-dom"
import { RegForm } from "@/features/auth"
import { LogoIcon } from "@/shared/ui"
import styles from "./AuthForm.module.scss"
import type { FC } from "react"
import { LoginForm } from "@/features/auth"

interface AuthFormProps {
    pathname: string
}

export const AuthForm: FC<AuthFormProps> = ({ pathname }) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <LogoIcon width="40px" height="40px" />
                    <h2 className={styles.title}>{`${pathname === 'registration' ? 'СОЗДАТЬ АККАУНТ' : 'С ВОЗВРАЩЕНИЕМ'}`}</h2>
                </div>
                <form className={styles.form}>
                    {
                        pathname === 'registration' ? <RegForm /> : <LoginForm />
                    }
                </form>
                <div className={styles.bottom}>
                    {
                        pathname === 'registration' ?
                        <p className={styles.text}>
                            Уже есть аккаунт?
                            <Link to={'/login'} className={styles.link}>Войти</Link>
                        </p>
                        :
                        <p className={styles.text}>
                            Нет аккаунта?
                            <Link to={'/registration'} className={styles.link}>Создать</Link>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}
