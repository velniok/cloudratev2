import { AdminTrackSuggestions } from "@/widgets/admin-track-suggestions"
import { FC } from "react"

interface AdminTrackSuggestionsPageProps {
    role: string
}

export const AdminTrackSuggestionsPage: FC<AdminTrackSuggestionsPageProps> = ({ role }) => {
    return (
        <>
        {
            role === 'admin' && <AdminTrackSuggestions />
        }
        </>
    )
}
