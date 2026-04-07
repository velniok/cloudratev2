import { ReactNode, useState, type ChangeEvent, type FC, type MouseEvent } from "react"
import styles from "./Input.module.scss"
import { EyeIcon, InfoIcon } from "../icon"

interface InputProps {
    label?: string
    placeholder: string
    type: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
    eyeIcon?: boolean
    isGray?: boolean
    children?: ReactNode
    icon?: ReactNode
    focusColor?: string
    onFocus?: () => void
    onBlur?: () => void
}

export const Input: FC<InputProps> = ({ icon, children, label, placeholder, type, value, onChange, onFocus, onBlur, error, eyeIcon, isGray, focusColor }) => {

    const [showPass, setShowPass] = useState<boolean>(false)

    const handleShowPass = (e: MouseEvent) => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    return (
        <div className={styles.wrapper}>
            { label && <label className={styles.label}>{label}</label> }
            {children}
            <div className={`${styles.inputWrapper} ${icon ? styles.search : ''}`}>
                {
                    icon && icon
                }
                <input
                    type={`${showPass ? "text" : type}`}
                    autoComplete="off"
                    className={`${styles.input} ${isGray ? styles.gray : ''} ${focusColor ? styles[`focus__${focusColor}`] : ''} ${error ? styles.error : ''}`}
                    placeholder={`${placeholder}`}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {
                    eyeIcon && <div className={styles.eyeIcon}>
                        <EyeIcon onClick={handleShowPass} />
                    </div>
                }
            </div>
            {
                error && <p className={styles.errorMessage}>
                    <InfoIcon />
                    {error}
                </p>
            }
        </div>
    )
}
