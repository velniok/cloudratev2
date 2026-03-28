import { useParams } from "react-router-dom"
import { LatestRatedTracks } from "@/widgets/latest-rated-tracks"
import { UserHeader } from "@/widgets/user-header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { getOneUserThunk, selectUserUpdateStatus } from "@/features/user"
import { selectUser, selectUserStatus } from "@/features/user"
import { UserFollows } from "@/widgets/user-follows"

export const UserPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const username = useParams().username
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)

    useEffect(() => {
        dispatch(getOneUserThunk({ username: username }))
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
    }, [username])

    return (
        <>
            <UserHeader user={user} userStatus={userStatus} />
            <LatestRatedTracks user={user} userStatus={userStatus} />
            <UserFollows user={user} userStatus={userStatus} />
        </>
    )
}
