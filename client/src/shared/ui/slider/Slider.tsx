import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Slider.module.scss'

interface SliderProps {
    children: ReactNode
}

export const Slider: FC<SliderProps> = ({ children }) => {

    const listRef = useRef<HTMLDivElement>(null)
    const [maxOffset, setMaxOffset] = useState(0) 
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const list = listRef.current
        if (!list) return

        const observer = new ResizeObserver(() => {
            setMaxOffset(list.scrollWidth - list.clientWidth)
        })

        observer.observe(list)
        return () => observer.disconnect()
    }, [children])

    const hundleNext = () => {
        const list = listRef.current
        if (!list) return
        const step = list.clientWidth / 2
        setOffset(prev => Math.min(prev + step, maxOffset))
    }

    const hundlePrev = () => {
        const list = listRef.current
        if (!list) return
        const step = list.clientWidth / 2
        setOffset(prev => Math.max(prev - step, 0))
    }

    return (
        <div className={styles.list__wrapper}>
            <div className={styles.list__inner}>
                <div className={styles.list} ref={listRef} style={{ transform: `translateX(-${offset}px)` }}>
                    {children}
                </div>
            </div>
            <div className={`${styles.btn} ${styles.prev} ${offset === 0 ? styles.disable : ''} ${maxOffset === 0 ? styles.hidden : ''}`} onClick={hundlePrev}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </div>
            <div className={`${styles.btn} ${styles.next} ${offset >= maxOffset ? styles.disable : ''} ${maxOffset === 0 ? styles.hidden : ''}`} onClick={hundleNext}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
        </div>
    )
}
