import { getOneUserThunk, selectUser, selectUserStatus } from "@/features/user"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { UserReviews } from "@/widgets/user-reviews"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const UserReviewsPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const username = useParams().username
    const user = useAppSelector(selectUser)
    const userStatus = useAppSelector(selectUserStatus)

    useEffect(() => {
        dispatch(getOneUserThunk({ username }))
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error')) 
    }, [username])

    return (
        userStatus === 'success' ?
        <UserReviews user={user} />
        :
        <>Загрузка...</>
    )
}
