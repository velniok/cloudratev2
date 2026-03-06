import { Title } from '@/shared/ui'
import styles from './SearchWidget.module.scss'
import { SearchInput } from '@/features/search'
import { SearchTabs } from '@/features/search'
import { useState } from 'react'

export const SearchWidget = () => {

    const [activeTab, setActiveTab] = useState<string>('artists')

    const hundleActiveTab = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПОИСК</Title>
                <SearchInput activeTab={activeTab} />
                <SearchTabs activeTab={activeTab} hundleActiveTab={hundleActiveTab} />
            </div>
        </div>
    )
}
