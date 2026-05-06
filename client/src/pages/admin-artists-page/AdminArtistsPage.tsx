import { useDocumentTitle } from "@/shared/lib"
import { AdminArtists } from "@/widgets/admin-artists"
import { FC } from "react"

interface AdminArtistsPageProps {
    role: string
}

export const AdminArtistsPage: FC<AdminArtistsPageProps> = ({ role }) => {

    useDocumentTitle('Админ-панель (Артисты)')

    return (
        <>
        {
            role === 'admin' &&
            <AdminArtists />
        }
        </>
    )
}
