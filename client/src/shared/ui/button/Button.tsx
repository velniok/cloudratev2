import type { FC, MouseEvent, ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode
    padding: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    color: 'accent' | 'default' | 'white'
    fontSize?: string
    active?: boolean
    className?: string
    setIsHovered?: (prev: boolean) => void
}

export const Button: FC<ButtonProps> = ({ children, padding, onClick, color, fontSize, active, className, setIsHovered }) => {
    return (
        <button
            type="button"
            onMouseEnter={() => setIsHovered?.(true)}
            onMouseLeave={() => setIsHovered?.(false)}
            className={`
                ${styles.button}
                ${className ?? className}
                ${styles[color]}
                ${active ? styles.active : ''}
            `}
            style={ { padding: `${padding}`, fontSize: `${fontSize}` } }
            onClick={onClick}>
            {children}
        </button>
    )
}