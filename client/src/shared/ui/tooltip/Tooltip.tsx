import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Tooltip.module.scss'
import { createPortal } from 'react-dom'

interface TooltipProps {
    children: ReactNode
    tooltip: ReactNode
}

export const Tooltip: FC<TooltipProps> = ({ children, tooltip }) => {

    const [show, setShow] = useState<boolean>(false)
    const [cords, setCords] = useState({ top: 0, left: 0 })
    const [pos, setPos] = useState('top')
    const triggerRef = useRef<HTMLDivElement | null>(null)

    const updatePosition = () => {
        if (!triggerRef.current) return
        const rect = triggerRef.current.getBoundingClientRect()
        const scrollY = window.scrollY

        let top = rect.top + scrollY
        let left = rect.left

        top = rect.top + scrollY - 8

        const tooltipWidth = 200
        const viewportWidth = window.innerWidth
        if (left + tooltipWidth > viewportWidth) {
            setPos('left')
        } else if (left - tooltipWidth < 0) {
            setPos('top')
        }

        setCords({ top, left })
    }

    useEffect(() => {
        if (!show) return

        updatePosition()
        const handleHide = () => setShow(false)
        const handleResize = () => updatePosition()

        window.addEventListener('touchmove', handleHide, true)
        window.addEventListener('resize', handleResize)
        
        return () => {
            window.removeEventListener('touchmove', handleHide, true)
            window.removeEventListener('resize', handleResize)
        }
    }, [show])

    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation()
        setShow(prev => !prev)
    }

    return (
        <div
            ref={triggerRef}
            className={styles.wrapper}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onTouchStart={handleTouchStart}
        >
            {children}
            {
                createPortal(
                    <div
                        className={`${styles.content} ${show ? styles.show : ''}`}
                        style={{
                            position: 'absolute',
                            top: cords.top,
                            left: cords.left,
                            transform: pos === 'left' ? 'translateX(-85%) translateY(-100%)' : 'translateY(-100%)'
                        }}
                    >
                        {tooltip}
                        <div
                            className={styles.arrow}
                            data-placement={pos}
                        />
                    </div>,
                    document.body
                )
            }
        </div>
    )
}
