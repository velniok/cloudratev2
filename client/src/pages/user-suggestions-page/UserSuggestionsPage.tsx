import { selectAuthUser } from "@/features/auth"
import { getUserProfileThunk, selectUser, selectUserStatus } from "@/features/user"
import { useAppDispatch, useAppSelector, useDocumentTitle, useNotification } from "@/shared/lib"
import { Loading } from "@/shared/ui"
import { UserSuggestionsPagination } from "@/widgets/user-suggestions-pagination"
import { useEffect } from "react"

export const UserSuggestionsPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)
    const authUser = useAppSelector(selectAuthUser)

    useDocumentTitle(authUser ? `${authUser.nickname}` : 'Загрузка...')

    useEffect(() => {
        if (authUser) {
            dispatch(getUserProfileThunk({ username: authUser.username }))
                .then()
                .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
        }
    }, [authUser])

    return (
        userStatus === 'success' && user ?
        <UserSuggestionsPagination user={user} />
        :
        <Loading />
    )
}
