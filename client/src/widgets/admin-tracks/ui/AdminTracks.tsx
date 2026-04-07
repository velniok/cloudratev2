import { Button, DeleteIcon, EditIcon, Input, Modal, PaginationButtons, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminTracks.module.scss'
import { useEffect, useState } from 'react'
import { ITrack } from '@/entities/track'
import { getTrackListThunk, selectTrackList, selectTrackListPagination, selectTrackListStatus, TrackCreateForm, TrackDeleteModal, TrackUpdateForm } from '@/features/track'
import { useAppSelector, usePagination, useSearch } from '@/shared/lib'
import { TStatus } from '@/shared/types'

export const AdminTracks = () => {

    const trackList = useAppSelector(selectTrackList)
    const trackListPagination = useAppSelector(selectTrackListPagination)
    const trackListStatus = useAppSelector(selectTrackListStatus)

    const { result, resultStatus, search, onChangeSearch } = useSearch('tracks')
    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getTrackListThunk, '/admin/tracks', 10)

    useEffect(() => {
        if (!result || search === '') {
            setData(trackList)
            setDataStatus(trackListStatus)
        } else {
            setData(result.tracks)
            setDataStatus(resultStatus)
        }
    }, [trackListStatus, trackList, result])

    const [data, setData] = useState<ITrack[] | null>(null)
    const [dataStatus, setDataStatus] = useState<TStatus>('idle')

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
        if (trackList) {
            setTrack((prev) => prev = trackList.filter(track => track.id === id)[0])
            setUpdateTrack(true)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ТРЕКИ</Title>
                <div className={styles.top}>
                    {
                        trackListStatus === 'success' && trackListPagination ? <p className={styles.count}>Всего: {trackListPagination.total} артистов</p> : <>Загрузка</>
                    }
                    <Button color='accent' padding='10px 20px 10px 20px' onClick={() => setCreateTrack(true)}>
                        <div className={styles.buttonInner}>
                            <PlusIcon />
                            <div className={styles.buttonText}>Добавить трек</div>
                        </div>
                    </Button>
                </div>
                <Input
                    placeholder='Поиск по названию трека...'
                    type='text'
                    isGray={true}
                    onChange={onChangeSearch}
                    value={search}
                />
                <Table
                    header={ ['трек', 'артист(-ы)', 'рейтинг', 'дата релиза', 'действия'] }
                    data={data}
                    dataStatus={dataStatus}
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
                {
                    trackListStatus === 'success' && trackListPagination &&
                        <div className={styles.bottom}>
                            <div className={styles.left}>
                                <p className={styles.text}>Показано {((trackListPagination.page - 1) * limit) + 1}-{limit * trackListPagination.page} из {trackListPagination.total}</p>
                            </div>
                            <PaginationButtons
                                page={trackListPagination.page}
                                totalPages={trackListPagination.totalPages}
                                hundleNextPage={hundleNextPage}
                                hundlePrevPage={hundlePrevPage}
                                hundlePage={hundlePage}
                            />
                        </div>
                }
                <Modal
                    modalTitle='Добавить трек'
                    modalDesc='Заполните информацию о треке'
                    width='520px'
                    modalOpen={createTrack}
                    modalClose={() => setCreateTrack(false)}
                >
                    {
                        trackListStatus === 'success' && trackList && trackListPagination &&
                        <TrackCreateForm
                            trackListLength={trackList.length}
                            lastPage={trackListPagination.totalPages}
                            limit={limit}
                            modalClose={() => setCreateTrack(false)}
                        />
                    }
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
                    {
                        trackListStatus === 'success' && trackList && trackListPagination && trackId &&
                        <TrackDeleteModal
                            trackListLength={trackList.length}
                            lastPage={trackListPagination.totalPages}
                            limit={limit}
                            modalClose={() => setDeleteTrack(false)}
                            trackId={trackId}
                            />
                    }
                </Modal>
            </div>
        </div>
    )
}
