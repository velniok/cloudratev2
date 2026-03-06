import { Title } from '@/shared/ui'
import styles from './SearchWidget.module.scss'
import { SearchInput } from '@/features/search'
import { SearchTabs } from '@/features/search'
import { useState } from 'react'
import { useSearch } from '@/shared/lib'

export const SearchWidget = () => {

    const { result, resultStatus, search, onChangeSearch, filter, hundleFilter } = useSearch()

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПОИСК</Title>
                <SearchInput search={search} onChangeSearch={onChangeSearch} />
                <SearchTabs result={result} resultStatus={resultStatus} filter={filter} hundleFilter={hundleFilter} />
            </div>
        </div>
    )
}
