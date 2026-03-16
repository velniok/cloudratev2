import { type FC } from "react"
import styles from "./Cover.module.scss"
import { ProfileIcon } from "../icon"

interface CoverProps {
    isHovered?: boolean
    width: string
    height: string
    borderRadius: string
    mb?: string
    url?: string
    isInput?: boolean
    className?: string
}

export const Cover: FC<CoverProps> = ({ isHovered, mb, url, width, height, borderRadius, isInput, className }) => {

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
                    ${className ?? ''}
                    ${mb ? styles[mb] : ''}
                    ${isHovered ? styles.hovered : ''}
                    ${isInput ? styles.input : ''}
                `}
                style={{
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                }}
            />
            :
            <div 
                className={`
                    ${styles.cover}
                    ${mb ? styles[mb] : ''}
                    ${isHovered ? styles.hovered : ''}
                    ${isInput ? styles.input : ''}
                `}
                style={{
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                }}
            >
                {
                    isInput && <ProfileIcon />
                }
            </div>
        }
        </>
    )
}
