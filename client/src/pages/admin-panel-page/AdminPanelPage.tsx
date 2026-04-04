import { AdminGeneral } from "@/widgets/admin-general"
import { FC } from "react"

interface AdminPanelPageProps {
    role: string
}

export const AdminPanelPage: FC<AdminPanelPageProps> = ({ role }) => {

    return (
        <>
            {
                role === 'admin' && <AdminGeneral />
            }
        </>
    )
}
