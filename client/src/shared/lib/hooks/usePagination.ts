import { useEffect, useState } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { useLocation, useNavigate } from "react-router-dom"
import { useNotification } from "./useNotification"

export const usePagination = (
        thunk: (params: any) => any,
        path: string, limit: number, id?: number, isFilter?: boolean, isSearch?: boolean
    ) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()
    const urlSearch = useLocation().search
    const params = new URLSearchParams(urlSearch)
    const page = Number(params.get('page') || 1)
    const filter = params.get('filter') || 'all'
    const search = params.get('search') || ''

    const [isLoadingPagination, setIsLoadingPagination] = useState<boolean>(false)

    useEffect(() => {
        setIsLoadingPagination(true)
        const query = {page: page, limit: limit, id: id, filter: filter, search: search}
        if (search) {
            const timer = setTimeout(() => {
                dispatch(thunk(query))
                    .then(() => setIsLoadingPagination(false))
            }, 500)
            return () => clearTimeout(timer)
        } else {
            dispatch(thunk(query)).unwrap()
                .then(() => setIsLoadingPagination(false))
                .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
        }
    }, [page, limit, id, filter, search])

    const hundleNextPage = () => {
        if (isFilter) return navigate(`${path}?page=${page + 1}&limit=${limit}&filter=${filter}`)
        if (isSearch) return navigate(`${path}?page=${page + 1}&limit=${limit}&search=${search}`)
        navigate(`${path}?page=${page + 1}&limit=${limit}`)
    }

    const hundlePrevPage = () => {
        if (page <= 1) return false
        if (isFilter) return navigate(`${path}?page=${page - 1}&limit=${limit}&filter=${filter}`)
        if (isSearch) return navigate(`${path}?page=${page - 1}&limit=${limit}&search=${search}`)
        navigate(`${path}?page=${page - 1}&limit=${limit}`)
    }

    const hundlePage = (fixPage: number) => {
        if (fixPage <= 0) return
        if (isFilter) return navigate(`${path}?page=${fixPage}&limit=${limit}&filter=${filter}`)
        if (isSearch) return navigate(`${path}?page=${fixPage}&limit=${limit}&search=${search}`)
        navigate(`${path}?page=${fixPage}&limit=${limit}`)
    }

    const hundleFilter = (filter: string) => {
        navigate(`${path}?page=1&limit=${limit}&filter=${filter}`)
    }

    const hundleSearch = (search: string) => {
        navigate(`${path}?page=1&limit=${limit}&search=${search}`)
    }

    return { hundleNextPage, hundlePrevPage, hundlePage, hundleFilter, hundleSearch, isLoadingPagination, search, filter, page, limit }
} 