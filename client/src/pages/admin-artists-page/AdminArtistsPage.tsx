import { AdminArtists } from "@/widgets/admin-artists"
import { FC } from "react"

interface AdminArtistsPageProps {
    role: string
}

export const AdminArtistsPage: FC<AdminArtistsPageProps> = ({ role }) => {

    return (
        <>
        {
            role === 'admin' &&
            <AdminArtists />
        }
        </>
    )
}
