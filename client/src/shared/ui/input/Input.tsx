import { useState, type ChangeEvent, type FC, type MouseEvent } from "react"
import styles from "./Input.module.scss"
import { EyeIcon, InfoIcon } from "../icon"

interface InputProps {
    label: string
    placeholder: string
    type: string
    value: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
    eyeIcon?: boolean
    isGray?: boolean
}

export const Input: FC<InputProps> = ({ label, placeholder, type, value, onChange, error, eyeIcon, isGray }) => {

    const [showPass, setShowPass] = useState<boolean>(false)

    const handleShowPass = (e: MouseEvent) => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <input
                    type={`${showPass ? "text" : type}`}
                    className={`${styles.input} ${isGray ? styles.gray : ''} ${error ? styles.error : ''}`}
                    placeholder={`${placeholder}`}
                    value={value}
                    onChange={onChange}
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
