import type { FC, MouseEvent, ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode
    padding: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    color: string
    fontSize?: string
}

export const Button: FC<ButtonProps> = ({ children, padding, onClick, color, fontSize }) => {
    return (
        <button type="button" className={`${styles.button} ${styles[color]}`} style={ { padding: `${padding}`, fontSize: `${fontSize}` } } onClick={onClick} >{children}</button>
    )
}
