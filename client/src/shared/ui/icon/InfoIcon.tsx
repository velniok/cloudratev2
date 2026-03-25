import { FC } from "react"

interface InfoIconProps {
    onClick?: () => void
}

export const InfoIcon: FC<InfoIconProps> = ({ onClick }) => {
    return (
        <svg onClick={onClick} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
        </svg>
    )
}
