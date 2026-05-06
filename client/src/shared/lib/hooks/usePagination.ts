import { useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { useLocation, useNavigate } from "react-router-dom"
import { useNotification } from "./useNotification"

export const usePagination = (
        thunk: (params: any) => any,
        path: string, limit: number, id?: number, isFilter?: boolean
    ) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()
    const search = useLocation().search
    const params = new URLSearchParams(search)
    const page = Number(params.get('page') || 1)
    const filter = params.get('filter') || 'all'

    useEffect(() => {
        const query = {page: page, limit: limit, id: id, filter: filter}
        dispatch(thunk(query)).unwrap()
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }, [page, limit, id, filter])

    const hundleNextPage = () => {
        if (isFilter) return navigate(`${path}?page=${page + 1}&limit=${limit}&filter=${filter}`)
        navigate(`${path}?page=${page + 1}&limit=${limit}`)
    }

    const hundlePrevPage = () => {
        if (page <= 1) return false
        if (isFilter) return navigate(`${path}?page=${page - 1}&limit=${limit}&filter=${filter}`)
        navigate(`${path}?page=${page - 1}&limit=${limit}`)
    }

    const hundlePage = (fixPage: number) => {
        if (fixPage <= 0) return
        if (isFilter) return navigate(`${path}?page=${fixPage}&limit=${limit}&filter=${filter}`)
        navigate(`${path}?page=${fixPage}&limit=${limit}`)
    }

    const hundleFilter = (filter: string) => {
        navigate(`${path}?page=1&limit=${limit}&filter=${filter}`)
    }

    return { hundleNextPage, hundlePrevPage, hundlePage, hundleFilter, filter, page, limit }
} 