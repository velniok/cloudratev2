import { useParams } from "react-router-dom"
import { UserReviews } from "@/widgets/user-reviews"
import { UserHeader } from "@/widgets/user-header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector, useDocumentTitle, useNotification } from "@/shared/lib"
import { getUserProfileThunk, selectUser, selectUserStatus } from "@/features/user"
import { UserFollows } from "@/widgets/user-follows"
import { Loading } from "@/shared/ui"

export const UserPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const username = useParams().username
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)

    useDocumentTitle(user?.nickname ? `${user.nickname}` : 'Загрузка...')

    useEffect(() => {
        if (username) {
            dispatch(getUserProfileThunk({ username: username })).unwrap()
                .then()
                .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
        }
    }, [username])

    return (
        <>
        {
            userStatus === 'success' && user ?
            <>
                <UserHeader user={user} />
                <UserReviews user={user} />
                <UserFollows user={user} />
            </>
            :
            <Loading />
        }
        </>
    )
}
