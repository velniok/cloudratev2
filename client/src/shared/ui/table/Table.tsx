import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { IArtist } from '@/entities/artist'
import { TableArtistItem } from './TableArtistItem'

interface TableProps {
    header: string[]
    tableName: string
    data: IArtist[]
    actions: {
        name: string
        func: () => ReactNode
    }[]
}

export const Table: FC<TableProps> = ({ header, tableName, data, actions }) => {

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
                            data.map((artist) => {
                                return <TableArtistItem actions={actions} artist={artist} key={artist.id} />
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
