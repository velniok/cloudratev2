import { useParams } from "react-router-dom"
import { LatestRatedTracks } from "@/widgets/latest-rated-tracks"
import { UserHeader } from "@/widgets/user-header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { getOneUserThunk } from "@/features/user"
import { selectUser, selectUserGetStatus } from "@/features/user"

export const UserPage = () => {

    const dispatch = useAppDispatch()
    const userId = useParams().userId
    const user = useAppSelector(selectUser)
    const getStatus = useAppSelector(selectUserGetStatus)

    useEffect(() => {
        dispatch(getOneUserThunk({ id: +userId }))
    }, [userId])

    return (
        <>
            <UserHeader user={user} getStatus={getStatus} />
            <LatestRatedTracks />
        </>
    )
}
