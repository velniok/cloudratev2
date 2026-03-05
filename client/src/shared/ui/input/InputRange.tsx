import { ChangeEvent, CSSProperties, FC } from 'react'
import styles from './InputRange.module.scss'

interface InputRangeProps {
    label: string
    values: number[]
    index: number
    onChange?: (e: ChangeEvent<HTMLInputElement>, index: number) => void
    notChange?: boolean
}

export const InputRange: FC<InputRangeProps> = ({ label, values, index, onChange, notChange }) => {
    return (
        <li className={styles.item}>
            <label className={styles.label}>{label}</label>
            {
                notChange?
                <input
                    style={{ '--value': `${values[index]}` } as CSSProperties}
                    type="range"
                    min='0'
                    max="10"
                    step='1'
                    value={values[index]}
                    className={`${styles.range} ${styles.notChange}`}
                    readOnly
                />
                :
                <input
                    style={{ '--value': `${values[index]}` } as CSSProperties}
                    type="range"
                    min='0'
                    max="10"
                    step='1'
                    value={values[index]}
                    onChange={(e) => onChange(e, index)}
                    className={styles.range}
                />
            }
            <span className={styles.value}>{values[index]}</span>
        </li>
    )
}
