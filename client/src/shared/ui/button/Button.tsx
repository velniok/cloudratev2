import type { FC, MouseEvent, ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode
    padding: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    color: 'accent' | 'default' | 'white' | 'orange'
    fontSize?: string
    active?: boolean
    className?: string
    setIsHovered?: (prev: boolean) => void
    icon?: ReactNode
    isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({ children, padding, icon, isLoading, onClick, color, fontSize, active, className, setIsHovered }) => {
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
                ${icon ? styles.icon : ''}
                ${isLoading ? styles.loading : ''}
            `}
            style={ { padding: `${padding}`, fontSize: `${fontSize}` } }
            onClick={onClick}>
                {icon}
                {children}
        </button>
    )
}