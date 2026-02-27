import { getGeneralThunk, selectGeneral, selectGeneralStatus } from "@/features/general"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { AdminGeneral } from "@/widgets/admin-general"
import { useEffect } from "react"

export const AdminPanelPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const general = useAppSelector(selectGeneral)
    const generalStatus = useAppSelector(selectGeneralStatus)

    useEffect(() => {
        dispatch(getGeneralThunk()).unwrap()
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }, [])

    return (
        <AdminGeneral general={general} generalStatus={generalStatus} />
    )
}
