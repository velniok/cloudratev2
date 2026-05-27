import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Tooltip.module.scss'
import { createPortal } from 'react-dom'

interface TooltipProps {
    children: ReactNode
    tooltip: ReactNode
    place?: string
    setIsTooltip?: (boolean: boolean) => void
}

export const Tooltip: FC<TooltipProps> = ({ children, tooltip, place, setIsTooltip }) => {

    const [show, setShow] = useState<boolean>(false)
    const [cords, setCords] = useState<{ top: number, left: number, arrowLeft: string | number }>({ top: 0, left: 0, arrowLeft: '50%' })
    const [pos, setPos] = useState(place || 'top')
    const triggerRef = useRef<HTMLDivElement | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)

    const updatePosition = () => {
        if (!triggerRef.current) return

        const rect = triggerRef.current.getBoundingClientRect()
        const scrollY = window.scrollY
        const viewportWidth = window.innerWidth

        const tooltipWidth = tooltipRef.current?.offsetWidth ?? 200
        const tooltipHeight = tooltipRef.current?.offsetHeight ?? 40
        const GAP = 8

        let left = rect.left + rect.width / 2 - tooltipWidth / 2
        let top = pos === 'bottom'
            ? rect.top + scrollY + rect.height + GAP + 2
            : rect.top + scrollY - tooltipHeight - GAP - 2

        if (left < GAP) left = GAP
        if (left + tooltipWidth > viewportWidth - GAP) left = viewportWidth - tooltipWidth - GAP

        const arrowLeft = rect.left + rect.width / 2 - left - 1
        if (setIsTooltip) setIsTooltip(show)
        setCords({ top, left, arrowLeft })
    }

    useEffect(() => {
        if (show) {
            setTimeout(updatePosition, 0)
        }
    }, [show])

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

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

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
            onClick={handleClick}
        >
            {children}
            {
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={`${styles.content} ${show ? styles.show : ''}`}
                        style={{
                            position: 'absolute',
                            top: cords.top,
                            left: cords.left,
                            transform: 'none'
                        }}
                    >
                        {tooltip}
                        <div
                            className={styles.arrow}
                            data-placement={pos}
                            style={{ left: cords.arrowLeft, transform: 'translateX(-50%)' }}
                        />
                    </div>,
                    document.body
                )
            }
        </div>
    )
}
