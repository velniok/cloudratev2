import { Button, DeleteIcon, EditIcon, Modal, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminTracks.module.scss'
import { FC, useState } from 'react'
import { ITrack } from '@/entities/track'
import { TStatus } from '@/shared/types'
import { TrackCreateForm, TrackDeleteModal, TrackUpdateForm } from '@/features/track'

interface AdminTracksProps {
    trackList: ITrack[]
    trackListStatus: TStatus
}

export const AdminTracks: FC<AdminTracksProps> = ({ trackList, trackListStatus }) => {

    const [createTrack, setCreateTrack] = useState<boolean>(false)
    const [updateTrack, setUpdateTrack] = useState<boolean>(false)
    const [deleteTrack, setDeleteTrack] = useState<boolean>(false)

    const [trackId, setTrackId] = useState<number | null>(null)
    const [track, setTrack] = useState<ITrack | null>(null)

    const hundleDeleteTrack = (id: number) => {
        setTrackId((prev) => prev = id)
        setDeleteTrack(true)
    }

    const hundleUpdateTrack = (id: number) => {
        setTrack((prev) => prev = trackList.filter(track => track.id === id)[0])
        setUpdateTrack(true)
    }

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
                            <div onClick={() => hundleUpdateTrack(id)}>
                                <EditIcon />
                            </div>
                            )
                        },
                        {
                            name: 'delete',
                            func: (id) => (
                            <div onClick={() => hundleDeleteTrack(id)}>
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
                <Modal
                    width='520px'
                    modalTitle='Редактировать трек'
                    modalDesc='Измените данные трека'
                    modalOpen={updateTrack}
                    modalClose={() => setUpdateTrack(false)}
                >
                    {
                        track && <TrackUpdateForm track={track} modalClose={() => setUpdateTrack(false)} />
                    }
                </Modal>
                <Modal
                    width='420px'
                    modalTitle='Удалить трек?'
                    modalDesc='Это действие нельзя отменить'
                    modalOpen={deleteTrack}
                    modalClose={() => setDeleteTrack(false)}
                >
                    <TrackDeleteModal modalClose={() => setDeleteTrack(false)} trackId={trackId} />
                </Modal>
            </div>
        </div>
    )
}
