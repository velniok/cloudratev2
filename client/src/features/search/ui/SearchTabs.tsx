import { Tabs } from '@/shared/ui'
import styles from './SearchTabs.module.scss'
import { FC } from 'react'
import { TrackCard, TrackCardSekelton, TrackRow, TrackRowSkelton } from '@/entities/track'
import { ArtistCard, ArtistCardSkeleton, ArtistRow, ArtistRowSkeleton } from '@/entities/artist'
import { UserCard, UserCardSkeleton } from '@/entities/user'
import { ISearch } from '../api/searchApiTypes'
import { TStatus } from '@/shared/types'
import { FollowArtistToggle } from '@/features/artist'
import { toggleFollowThunk } from '@/features/user'

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
            {
                resultStatus === 'success' ?
                <>
                {
                    result[filter]?.length === 0 ?
                    <p className={styles.text}>Ничего не найдено.</p>
                    :
                    <div className={`${styles.list} ${styles[filter]} ${window.innerWidth <= 767 ? styles.row : ''}`}>
                        {filter === 'tracks' && result.tracks?.map(t => 
                        {
                            if (window.innerWidth > 767) {
                                return <TrackCard key={t.id} track={t} />
                            } else {
                                return <TrackRow key={t.id} track={t} />
                            }
                        }
                        )}
                        {filter === 'artists' && result.artists?.map(a =>
                        {
                            if (window.innerWidth > 767) {
                                return <ArtistCard key={a.id} artist={a} />
                            } else {
                                return <ArtistRow key={a.id} artist={a} action={<FollowArtistToggle thunk={toggleFollowThunk} isFollowed={a.follow.isFollowed} artistId={a.id} />} />
                            }
                        }
                    )}
                        {filter === 'users' && result.users?.map(u => <UserCard key={u.id} user={u} />)}
                    </div>
                }
                </>
                :
                resultStatus === 'idle' ?
                <p className={styles.text}>Ищите треки, артистов, пользователей.</p>
                :
                <div className={`${styles.list} ${styles[filter]} ${window.innerWidth <= 767 ? styles.row : ''}`}>
                    {filter === 'tracks' && Array.from({ length: 5 }).map((_, index) => {
                        if (window.innerWidth > 767) {
                            return <TrackCardSekelton key={index} />
                        } else {
                            return <TrackRowSkelton key={index} review />
                        }
                    }
                    )}
                    {filter === 'artists' && Array.from({ length: 5 }).map((_, index) => 
                    {
                        if (window.innerWidth > 767) {
                            return <ArtistCardSkeleton key={index} />
                        } else {
                            return <ArtistRowSkeleton key={index} />
                        }
                    }
                )}
                    {filter === 'users' && Array.from({ length: 5 }).map((_, index) => <UserCardSkeleton key={index} />)}
                </div>
            }
        </div>
    )
}
