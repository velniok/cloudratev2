import { getUsersThunk } from "@/features/user"
import { selectUserList, selectUserListStatus } from "@/features/user/model/selectors"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { AdminUsers } from "@/widgets/admin-users"
import { FC, useEffect } from "react"

interface AdminUsersPageProps {
    role: string
}

export const AdminUsersPage: FC<AdminUsersPageProps> = ({ role }) => {

    const dispatch = useAppDispatch()
    const userList = useAppSelector(selectUserList)
    const userListStatus = useAppSelector(selectUserListStatus)

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [])

    return (
        <>
        {
            role === 'admin' && <AdminUsers userList={userList} userListStatus={userListStatus} />
        }
        </>
    )
}
