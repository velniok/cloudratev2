import { Tabs } from '@/shared/ui'
import styles from './SearchTabs.module.scss'
import { FC } from 'react'
import { useAppSelector } from '@/shared/lib'
import { selectSearch, selectSearchStatus } from '../model/selectors'
import { TrackCard, TrackCardSekelton } from '@/entities/track'
import { ArtistCard, ArtistCardSkeleton } from '@/entities/artist'
import { UserCard, UserCardSkeleton } from '@/entities/user'

interface SearchTabsProps {
    activeTab: string
    hundleActiveTab: (tab: string) => void
}

export const SearchTabs: FC<SearchTabsProps> = ({ hundleActiveTab, activeTab }) => {

    const search = useAppSelector(selectSearch)
    const searchStatus = useAppSelector(selectSearchStatus)

    const tabs = [
        {
            title: 'Артисты',
            name: 'artists',
        },
        {
            title: 'Треки',
            name: 'tracks',
        },
        {
            title: 'Пользователи',
            name: 'users',
        },
    ]

    return (
        <div className={styles.wrapper}>
            <Tabs tabs={tabs} activeTab={activeTab} hundleActiveTab={(tab) => hundleActiveTab(tab)} />
            <div className={`${styles.list} ${activeTab === 'users' ? styles.users : ''}`}>
                {
                    searchStatus === 'success' ?
                    <>
                    {
                        search[activeTab]?.length === 0 ?
                        <>Ничего не найдено</>
                        :
                        <>
                            {activeTab === 'tracks' && search.tracks?.map(t => <TrackCard key={t.id} track={t} />)}
                            {activeTab === 'artists' && search.artists?.map(a => <ArtistCard key={a.id} artist={a} />)}
                            {activeTab === 'users' && search.users?.map(u => <UserCard key={u.id} user={u} />)}
                        </>
                    }
                    </>
                    :
                    searchStatus === 'idle' ?
                    <>Начните поиск</>
                    :
                    <>
                        {activeTab === 'tracks' && Array.from({ length: 5 }).map((_, index) => <TrackCardSekelton key={index} />)}
                        {activeTab === 'artists' && Array.from({ length: 5 }).map((_, index) => <ArtistCardSkeleton key={index} />)}
                        {activeTab === 'users' && Array.from({ length: 5 }).map((_, index) => <UserCardSkeleton key={index} />)}
                    </>
                }
            </div>
        </div>
    )
}
