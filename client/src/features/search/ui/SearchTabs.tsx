import { Tabs } from '@/shared/ui'
import styles from './SearchTabs.module.scss'
import { FC } from 'react'
import { TrackCard, TrackCardSekelton } from '@/entities/track'
import { ArtistCard, ArtistCardSkeleton } from '@/entities/artist'
import { UserCard, UserCardSkeleton } from '@/entities/user'
import { ISearch } from '../api/searchApiTypes'
import { TStatus } from '@/shared/types'

interface SearchTabsProps {
    filter: string
    hundleFilter: (tab: 'artists' | 'tracks' | 'users') => void
    result: ISearch
    resultStatus: TStatus
}

export const SearchTabs: FC<SearchTabsProps> = ({ hundleFilter, filter, result, resultStatus }) => {

    const tabs: { title: string, name: 'artists' | 'tracks' | 'users' }[] = [
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
            <Tabs tabs={tabs} activeTab={filter} hundleActiveTab={hundleFilter} />
            <div className={`${styles.list} ${styles[filter]}`}>
                {
                    resultStatus === 'success' ?
                    <>
                    {
                        result[filter]?.length === 0 ?
                        <p className={styles.text}>Ничего не найдено.</p>
                        :
                        <>
                            {filter === 'tracks' && result.tracks?.map(t => <TrackCard key={t.id} track={t} />)}
                            {filter === 'artists' && result.artists?.map(a => <ArtistCard key={a.id} artist={a} />)}
                            {filter === 'users' && result.users?.map(u => <UserCard key={u.id} user={u} />)}
                        </>
                    }
                    </>
                    :
                    resultStatus === 'idle' ?
                    <p className={styles.text}>Ищите треки, артистов, пользователей.</p>
                    :
                    <>
                        {filter === 'tracks' && Array.from({ length: 5 }).map((_, index) => <TrackCardSekelton key={index} />)}
                        {filter === 'artists' && Array.from({ length: 5 }).map((_, index) => <ArtistCardSkeleton key={index} />)}
                        {filter === 'users' && Array.from({ length: 5 }).map((_, index) => <UserCardSkeleton key={index} />)}
                    </>
                }
            </div>
        </div>
    )
}
