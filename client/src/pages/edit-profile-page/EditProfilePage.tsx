import { selectUser, selectUserGetStatus } from "@/features/user"
import { getOneUserThunk } from "@/features/user"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { EditProfile } from "@/widgets/edit-profile"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const EditProfilePage = () => {

    const dispatch = useAppDispatch()
    const userId = useParams().userId
    const user = useAppSelector(selectUser)
    const getStatus = useAppSelector(selectUserGetStatus)

    useEffect(() => {
        dispatch(getOneUserThunk({ id: +userId }))
    }, [userId])

    return (
        <>
            <EditProfile user={user} getStatus={getStatus} />
        </>
    )
}
