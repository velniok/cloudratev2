import { useParams } from "react-router-dom"
import { UserReviews } from "@/widgets/user-reviews"
import { UserHeader } from "@/widgets/user-header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { getUserProfileThunk, selectUser, selectUserStatus } from "@/features/user"
import { UserFollows } from "@/widgets/user-follows"
import { Loading } from "@/shared/ui"

export const UserPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const username = useParams().username
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)

    useEffect(() => {
        dispatch(getUserProfileThunk({ username: username }))
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
    }, [username])

    return (
        <>
        {
            userStatus === 'success' ?
            <>
                <UserHeader user={user} userStatus={userStatus} />
                <UserReviews user={user} userStatus={userStatus} />
                <UserFollows user={user} />
            </>
            :
            <Loading />
        }
        </>
    )
}
