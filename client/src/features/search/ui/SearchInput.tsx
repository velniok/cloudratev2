import { Input } from '@/shared/ui'
import { ChangeEvent, FC } from 'react'

interface SearchInputProps {
    search: string
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput: FC<SearchInputProps> = ({ onChangeSearch, search }) => {   

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
