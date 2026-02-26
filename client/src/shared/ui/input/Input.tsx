import { ReactNode, useState, type ChangeEvent, type FC, type MouseEvent } from "react"
import styles from "./Input.module.scss"
import { EyeIcon, InfoIcon, SearchIcon } from "../icon"

interface InputProps {
    label: string
    placeholder: string
    type: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
    eyeIcon?: boolean
    isGray?: boolean
    labelFontSize?: string
    inputFontSize?: string
    isSearch?: boolean
    onFocus?: () => void
    onBlur?: () => void
    children?: ReactNode
}

export const Input: FC<InputProps> = ({ children, label, isSearch, placeholder, type, value, onFocus, onBlur, onChange, error, eyeIcon, isGray, labelFontSize, inputFontSize }) => {

    const [showPass, setShowPass] = useState<boolean>(false)

    const handleShowPass = (e: MouseEvent) => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.label} style={{ fontSize: `${labelFontSize}` }}>{label}</label>
            {children}
            <div className={`${styles.inputWrapper} ${isSearch ? styles.search : ''}`}>
                {
                    isSearch && <SearchIcon />
                }
                <input
                    type={`${showPass ? "text" : type}`}
                    autoComplete="off"
                    className={`${styles.input} ${isGray ? styles.gray : ''} ${error ? styles.error : ''}`}
                    placeholder={`${placeholder}`}
                    value={value}
                    onChange={onChange}
                    style={{ fontSize: `${inputFontSize}` }}
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
