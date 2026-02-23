import type { FC } from "react"
import styles from "./LogoIcon.module.scss"

interface LogoIconProps {
    width: string
    height: string
}

export const LogoIcon: FC<LogoIconProps> = ({ width, height }) => {
    return (
        <div className={styles.logo} style={ { width: `${width}`, height: `${height}` } }></div>
    )
}
