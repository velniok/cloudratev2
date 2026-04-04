import { AdminTracks } from "@/widgets/admin-tracks"
import { FC } from "react"

interface AdminTracksPageProps {
    role: string
}

export const AdminTracksPage: FC<AdminTracksPageProps> = ({ role }) => {

    return (
        <>
        {
            role === 'admin' && <AdminTracks />
        }
        </>
    )
}
