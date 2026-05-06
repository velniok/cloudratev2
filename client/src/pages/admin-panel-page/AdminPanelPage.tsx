import { useDocumentTitle } from "@/shared/lib"
import { AdminGeneral } from "@/widgets/admin-general"
import { FC } from "react"

interface AdminPanelPageProps {
    role: string
}

export const AdminPanelPage: FC<AdminPanelPageProps> = ({ role }) => {

    useDocumentTitle('Админ-панель')

    return (
        <>
            {
                role === 'admin' && <AdminGeneral />
            }
        </>
    )
}
