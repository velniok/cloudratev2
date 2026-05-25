import { selectAuthStatus, selectAuthUser } from "@/features/auth"
import { useAppSelector } from "@/shared/lib"
import { Loading } from "@/shared/ui"
import { NotificationsPagination } from "@/widgets/notifications-pagination"

export const NotificationsPage = () => {

    const authUser = useAppSelector(selectAuthUser)
    const authStatus = useAppSelector(selectAuthStatus)

    return (
        <>
        {
            authStatus === 'success' && authUser ?
            <NotificationsPagination user={authUser} />
            :
            <Loading />
        }
        </>
    )
}
