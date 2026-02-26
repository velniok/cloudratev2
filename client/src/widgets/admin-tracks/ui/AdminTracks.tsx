import { Button, DeleteIcon, EditIcon, Modal, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminTracks.module.scss'
import { FC, useState } from 'react'
import { ITrack } from '@/entities/track'
import { TStatus } from '@/shared/types'
import { TrackCreateForm } from '@/features/track/ui/TrackCreateForm'

interface AdminTracksProps {
    trackList: ITrack[]
    trackListStatus: TStatus
}

export const AdminTracks: FC<AdminTracksProps> = ({ trackList, trackListStatus }) => {

    const [createTrack, setCreateTrack] = useState<boolean>(false)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ТРЕКИ</Title>
                <div className={styles.top}>
                    <Button color='accent' padding='10px 20px 10px 20px' onClick={() => setCreateTrack(true)}>
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
                <Modal
                    modalTitle='Добавить трек'
                    modalDesc='Заполните информацию о треке'
                    width='520px'
                    modalOpen={createTrack}
                    modalClose={() => setCreateTrack(false)}
                >
                    <TrackCreateForm modalClose={() => setCreateTrack(false)} />
                </Modal>
            </div>
        </div>
    )
}
