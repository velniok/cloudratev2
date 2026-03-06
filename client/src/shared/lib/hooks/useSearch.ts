import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"
import { clearSearch, searchThunk, selectSearch, selectSearchStatus } from "@/features/search"

export const useSearch = (fixedTab?: 'tracks' | 'artists' | 'users') => {
    const dispatch = useAppDispatch()
    const result = useAppSelector(selectSearch)
    const resultStatus = useAppSelector(selectSearchStatus)
    const [search, setSearch] = useState<string>('')
    const [filter, setFilter] = useState<'artists' | 'tracks' | 'users'>(fixedTab || 'artists')
    
    useEffect(() => {
        if (!search) {
            dispatch(clearSearch())
        } else {
            const timer = setTimeout(() => {
                dispatch(searchThunk({
                    search: search,
                    filter: filter
                }))
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [search])

    useEffect(() => {
        setSearch('')
        dispatch(clearSearch())
    }, [filter])

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const hundleFilter = (tab: 'artists' | 'tracks' | 'users') => {
        setFilter(tab)
    }

    return { result, resultStatus, search, onChangeSearch, setSearch, filter, hundleFilter }
}