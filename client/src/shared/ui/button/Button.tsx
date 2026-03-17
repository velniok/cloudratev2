import type { FC, MouseEvent, ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode
    padding: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    color: 'accent' | 'default'
    fontSize?: string
    active?: boolean
    className?: string
}

export const Button: FC<ButtonProps> = ({ children, padding, onClick, color, fontSize, active, className }) => {
    return (
        <button type="button" className={`${styles.button} ${className ?? className} ${styles[color]} ${active ? styles.active : ''}`} style={ { padding: `${padding}`, fontSize: `${fontSize}` } } onClick={onClick} >{children}</button>
    )
}
