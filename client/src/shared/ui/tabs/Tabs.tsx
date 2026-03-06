import { FC } from 'react'
import styles from './Tabs.module.scss'

interface TabsProps {
    tabs: { title: string, name: string }[]
    activeTab: string
    hundleActiveTab: (tab: string) => void
}

export const Tabs: FC<TabsProps> = ({ tabs, activeTab, hundleActiveTab }) => {
    return (
        <ul className={styles.list}>
        {
            tabs.map((tab, index) => {
                return (
                    <li key={index} onClick={() => hundleActiveTab(tab.name)} className={`${styles.item} ${activeTab === tab.name ? styles.active : ''}`}>
                        {tab.title}
                    </li>
                )
            })
        }
        </ul>
    )
}
