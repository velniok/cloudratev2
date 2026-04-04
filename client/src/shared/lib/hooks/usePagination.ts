import { useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { useLocation, useNavigate } from "react-router-dom"
import { useNotification } from "./useNotification"

export const usePagination = (
        thunk: (params: any) => any,
        path: string, limit: number, id?: number
    ) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()
    const search = useLocation().search
    const params = new URLSearchParams(search)
    const page = Number(params.get('page') || 1)

    useEffect(() => {
        const query = {page: page, limit: limit, id: id}
        dispatch(thunk(query)).unwrap()
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }, [page, limit, id])

    const hundleNextPage = () => {
        navigate(`${path}?page=${page + 1}&limit=${limit}`)
    }

    const hundlePrevPage = () => {
        if (page <= 1) return
        navigate(`${path}?page=${page - 1}&limit=${limit}`)
    }

    const hundlePage = (fixPage: number) => {
        if (fixPage <= 0) return
        navigate(`${path}?page=${fixPage}&limit=${limit}`)
    }

    return { hundleNextPage, hundlePrevPage, hundlePage, page, limit }
} 