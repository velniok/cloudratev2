import { useParams } from "react-router-dom"
import { LatestRatedTracks } from "@/widgets/latest-rated-tracks"
import { UserHeader } from "@/widgets/user-header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { getOneUserThunk } from "@/features/user"
import { selectUser, selectUserGetStatus } from "@/features/user"

export const UserPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const userId = useParams().userId
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserGetStatus)

    useEffect(() => {
        dispatch(getOneUserThunk({ id: +userId }))
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
    }, [userId])

    return (
        <>
            <UserHeader user={user} userStatus={userStatus} />
            <LatestRatedTracks user={user} userStatus={userStatus} />
        </>
    )
}
