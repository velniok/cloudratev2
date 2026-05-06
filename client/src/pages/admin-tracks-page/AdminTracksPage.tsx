import { useDocumentTitle } from "@/shared/lib"
import { AdminTracks } from "@/widgets/admin-tracks"
import { FC } from "react"

interface AdminTracksPageProps {
    role: string
}

export const AdminTracksPage: FC<AdminTracksPageProps> = ({ role }) => {

    useDocumentTitle('Админ-панель (Треки)')

    return (
        <>
        {
            role === 'admin' && <AdminTracks />
        }
        </>
    )
}
