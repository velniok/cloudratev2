import { useDocumentTitle } from "@/shared/lib"
import { AdminTrackSuggestions } from "@/widgets/admin-track-suggestions"
import { FC } from "react"

interface AdminTrackSuggestionsPageProps {
    role: string
}

export const AdminTrackSuggestionsPage: FC<AdminTrackSuggestionsPageProps> = ({ role }) => {

    useDocumentTitle('Админ-панель (Заявки)')

    return (
        <>
        {
            role === 'admin' && <AdminTrackSuggestions />
        }
        </>
    )
}
