import type { FC, MouseEvent } from "react"

interface EyeIconProps {
    onClick?: (e: MouseEvent) => void
}

export const EyeIcon: FC<EyeIconProps> = ({ onClick }) => {
    return (
        <svg onClick={onClick} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    )
}
