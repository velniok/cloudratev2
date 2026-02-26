import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { IArtist } from '@/entities/artist'
import { TableArtistItem } from './TableArtistItem'
import { TStatus } from '@/shared/types'
import { TableSkeleton } from './TableSkeleton'
import { ITrack } from '@/entities/track'
import { TableTrackItem } from './TableTrackItem'

interface TableProps {
    header: string[]
    data: IArtist[] | ITrack[]
    dataStatus: TStatus
    actions: {
        name: string
        func: (id: number) => ReactNode
    }[]
}

export const Table: FC<TableProps> = ({ header, data, dataStatus, actions }) => {

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead className={styles.table__header}>
                    <tr className={styles.table__row}>
                        {
                            header.map((head, id) => {
                                return <th key={id} className={styles.table__head}>{head}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody className={styles.table__body}>
                    {
                        dataStatus === 'success'
                        ?
                        data.map((item: IArtist | ITrack) => {
                            switch (item.kind) {
                                case 'artist':
                                    return <TableArtistItem artist={item} key={item.id} actions={actions} />
                                case 'track':
                                    return <TableTrackItem track={item} key={item.id} actions={actions} />
                                default:
                                    return null    
                            }
                        })
                        :
                        Array.from({ length: 7 }).map((_, index) => {
                            return <TableSkeleton key={index} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
