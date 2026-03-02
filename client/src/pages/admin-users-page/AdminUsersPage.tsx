import { getUsersThunk } from "@/features/user"
import { selectUserList, selectUserListStatus } from "@/features/user/model/selectors"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { AdminUsers } from "@/widgets/admin-users"
import { useEffect } from "react"

export const AdminUsersPage = () => {

    const dispatch = useAppDispatch()
    const userList = useAppSelector(selectUserList)
    const userListStatus = useAppSelector(selectUserListStatus)

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [])

    return (
        <AdminUsers userList={userList} userListStatus={userListStatus} />
    )
}
