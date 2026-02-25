import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { IArtist } from '@/entities/artist'
import { TableArtistItem } from './TableArtistItem'
import { TStatus } from '@/shared/types'
import { TableSkeleton } from './TableSkeleton'

interface TableProps {
    header: string[]
    tableName: string
    data: IArtist[]
    dataStatus: TStatus
    actions: {
        name: string
        func: (id: number) => ReactNode
    }[]
}

export const Table: FC<TableProps> = ({ header, tableName, data, actions, dataStatus }) => {

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
                        tableName === 'artist'
                        ?
                        <>
                        {
                            dataStatus === 'success' ?
                            <>
                            {
                                data.map((artist) => {
                                    return <TableArtistItem actions={actions} artist={artist} key={artist.id} />
                                })
                            }
                            </>
                            :
                            Array.from({ length: 7 }).map((_, index) => {
                                return <TableSkeleton key={index} />
                            })
                        }
                        </>
                        : <></>
                    }
                </tbody>
            </table>
        </div>
    )
}
