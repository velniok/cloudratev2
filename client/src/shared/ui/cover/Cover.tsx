import type { FC } from "react"
import styles from "./Cover.module.scss"

interface CoverProps {
    isHovered?: boolean
    size?: string
    mb?: string
    url?: string
}

export const Cover: FC<CoverProps> = ({ isHovered, size, mb, url }) => {
    return (
        <>
        {
            url
            ?
            <img
                src={`${url}`}
                alt=""
                className={`
                    ${styles.cover}
                    ${mb ? styles[mb] : ''}
                    ${size ? styles[size] : ''}
                    ${isHovered ? styles.hovered : ''}
                `}/>
            :
            <div className=
                {`
                    ${styles.cover}
                    ${mb ? styles[mb] : ''}
                    ${size ? styles[size] : ''}
                    ${isHovered ? styles.hovered : ''}
                `}>
            </div>
        }
        </>
    )
}
