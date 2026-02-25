import { Button, DeleteIcon, EditIcon, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminTracks.module.scss'
import { FC } from 'react'
import { ITrack } from '@/entities/track'
import { TStatus } from '@/shared/types'

interface AdminTracksProps {
    trackList: ITrack[]
    trackListStatus: TStatus
}

export const AdminTracks: FC<AdminTracksProps> = ({ trackList, trackListStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ТРЕКИ</Title>
                <div className={styles.top}>
                    <Button color='accent' padding='10px 20px 10px 20px'>
                        <div className={styles.buttonInner}>
                            <PlusIcon />
                            <div className={styles.buttonText}>Добавить трек</div>
                        </div>
                    </Button>
                </div>
                <Table
                    header={ ['трек', 'артист(-ы)', 'рейтинг', 'действия'] }
                    data={trackList}
                    dataStatus={trackListStatus}
                    actions={[
                        {
                            name: 'edit',
                            func: (id) => (
                            <div>
                                <EditIcon />
                            </div>
                            )
                        },
                        {
                            name: 'delete',
                            func: (id) => (
                            <div>
                                <DeleteIcon />
                            </div>
                            )
                        },
                    ]}
                />
            </div>
        </div>
    )
}
