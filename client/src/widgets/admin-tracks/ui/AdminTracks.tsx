import { Button, Input, Modal, PaginationButtons, PlusIcon, Skeleton, Title } from '@/shared/ui'
import styles from './AdminTracks.module.scss'
import { ChangeEvent, useState } from 'react'
import { ITrack, TrackRowAdmin } from '@/entities/track'
import { getTrackListThunk, selectTrackList, selectTrackListPagination, selectTrackListStatus, TrackCreateForm, TrackDeleteModal, TrackUpdateForm } from '@/features/track'
import { useAppSelector, usePagination } from '@/shared/lib'

export const AdminTracks = () => {

    const trackList = useAppSelector(selectTrackList)
    const trackListPagination = useAppSelector(selectTrackListPagination)
    const trackListStatus = useAppSelector(selectTrackListStatus)

    const { hundleNextPage, hundlePrevPage, hundlePage, limit, hundleSearch, search } = usePagination(getTrackListThunk, '/admin/tracks', 10, undefined, undefined, true)
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        hundleSearch(e.target.value)
    }

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
                <div className={styles.top}>
                    <Title>ТРЕКИ</Title>
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
                <ul className={styles.header}>
                    <li className={styles.header__item}>ID</li>
                    <li className={styles.header__item}>ТРЕК</li>
                    <li className={styles.header__item}>АРТИСТ(-Ы)</li>
                    <li className={styles.header__item}>РЕЙТИНГ</li>
                    <li className={styles.header__item}>ДАТА РЕЛИЗА</li>
                    <li className={styles.header__item} style={{ textAlign: 'right' }}>ДЕЙСТВИЯ</li>
                </ul>
                {
                    trackListStatus === 'success' && trackList && trackListPagination ?
                    <>
                        <ul className={styles.list}>
                            {
                                trackList.map((track) => {
                                    return <TrackRowAdmin
                                        key={track.id}
                                        track={track}
                                        hundleUpdateTrack={(id: number) => hundleUpdateTrack(id)}
                                        hundleDeleteTrack={(id: number) => hundleDeleteTrack(id)}
                                    />
                                })
                            }
                        </ul>
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
                    </>
                    :
                    <ul className={styles.list}>
                        {
                            Array.from({ length: 10 }).map((_, index) => {
                                return <Skeleton key={index} isBlack width='100%' height='64px' borderRadius='12px' />
                            })
                        }
                    </ul>
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
                        track && <TrackUpdateForm key={track.id} track={track} modalClose={() => setUpdateTrack(false)} />
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
