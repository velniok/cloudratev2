import { Input } from '@/shared/ui'
import styles from './SearchInput.module.scss'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { clearSearch, searchThunk } from '../model/slice'
import { selectSearchStatus } from '../model/selectors'

interface SearchInputProps {
    activeTab: string
}

export const SearchInput: FC<SearchInputProps> = ({ activeTab }) => {

    const dispatch = useAppDispatch()
    const searchStatus = useAppSelector(selectSearchStatus)

    const [search, setSearch] = useState<string>('')
    
    useEffect(() => {
        if (search !== '') {
            dispatch(searchThunk({
                search: search,
                filter: activeTab,
            }))
        } else if (searchStatus !== 'idle') {
            dispatch(clearSearch())
        }
    }, [search])

    useEffect(() => {
        setSearch('')
    }, [activeTab])

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <Input
            placeholder='Начните вводить текст...'
            type='text'
            isSearch={true}
            isGray={true}
            value={search}
            onChange={onChangeSearch}
        />
    )
}
