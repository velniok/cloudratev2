import { getUserProfileThunk, selectUser, selectUserStatus } from "@/features/user"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { Loading } from "@/shared/ui"
import { EditProfile } from "@/widgets/edit-profile"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const EditProfilePage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const username = useParams().username
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)

    useEffect(() => {
        if (username) {
            dispatch(getUserProfileThunk({ username: username }))
                .then()
                .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
        }
    }, [username])

    return (
        <>
        {
            userStatus === 'success' && user ?
            <EditProfile user={user} />
            :
            <Loading />
        }
        </>
    )
}
