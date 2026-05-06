import { getUserProfileThunk, selectUser, selectUserStatus } from "@/features/user"
import { useAppDispatch, useAppSelector, useDocumentTitle, useNotification } from "@/shared/lib"
import { Loading } from "@/shared/ui"
import { UserTrackSuggestions } from "@/widgets/user-track-suggestions"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const UserTrackSuggestionsPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const username = useParams().username
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)

    useDocumentTitle(user ? `${user.nickname}` : 'Загрузка...')

    useEffect(() => {
        if (username) {
            dispatch(getUserProfileThunk({ username }))
                .then()
                .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
        }
    }, [username])

    return (
        userStatus === 'success' && user ?
        <UserTrackSuggestions user={user} />
        :
        <Loading />
    )
}
