import type { FC, MouseEvent, ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode
    padding: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    color: 'accent' | 'default'
    fontSize?: string
    active?: boolean
}

export const Button: FC<ButtonProps> = ({ children, padding, onClick, color, fontSize, active }) => {
    return (
        <button type="button" className={`${styles.button} ${styles[color]} ${active ? styles.active : ''}`} style={ { padding: `${padding}`, fontSize: `${fontSize}` } } onClick={onClick} >{children}</button>
    )
}
