import { Button, DeleteIcon, EditIcon, Input, Modal, PaginationButtons, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'
import { useAppSelector, usePagination, useSearch } from '@/shared/lib'
import { IArtist } from '@/entities/artist'
import { useEffect, useState } from 'react'
import { TStatus } from '@/shared/types'
import { ArtistCreateForm, ArtistDeleteModal, getArtistListThunk, selectArtistList, selectArtistListPagination, selectArtistListStatus } from '@/features/artist'
import { ArtistUpdateForm } from '@/features/artist/ui/ArtistUpdateForm'

export const AdminArtists = () => {

    const artistList = useAppSelector(selectArtistList)
    const artistListPagination = useAppSelector(selectArtistListPagination)
    const artistListStatus = useAppSelector(selectArtistListStatus)

    const { result, resultStatus, search, onChangeSearch } = useSearch('artists')
    const { hundleNextPage, hundlePrevPage, hundlePage, limit } = usePagination(getArtistListThunk, '/admin/artists', 10)

    useEffect(() => {
        if (!result || search === '') {
            setData(artistList)
            setDataStatus(artistListStatus)
        } else {
            setData(result.artists)
            setDataStatus(resultStatus)
        }
    }, [artistListStatus, artistList, result])

    const [data, setData] = useState<IArtist[] | null>(null)
    const [dataStatus, setDataStatus] = useState<TStatus>('idle')

    const [createArtist, setCreateArtist] = useState<boolean>(false)
    const [updateArtist, setUpdateArtist] = useState<boolean>(false)
    const [deleteArtist, setDeleteArtist] = useState<boolean>(false)

    const [artistId, setArtistId] = useState<number | null>(null)
    const [artist, setArtist] = useState<IArtist | null>(null)

    const hundleUpdateArtist = (id: number) => {
        if (artistList) {
            setArtist(prev => prev = artistList.filter(artist => artist.id === id)[0])
            setUpdateArtist(true)
        }
    }

    const hundleDeleteArtist = (id: number) => {
        setArtistId((prev) => prev = id)
        setDeleteArtist(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>АРТИСТЫ</Title>
                <div className={styles.top}>
                    {
                        artistListStatus === 'success' && artistListPagination ?
                            <p className={styles.count}>
                                Всего: {artistListPagination.total} артистов
                            </p>
                        :
                            <>Загрузка</>
                    }
                    <Button color='accent' padding='10px 20px 10px 20px' onClick={() => setCreateArtist(true)}>
                        <div className={styles.buttonInner}>
                            <PlusIcon />
                            <div className={styles.buttonText}>Добавить артиста</div>
                        </div>
                    </Button>
                </div>
                <Input
                    placeholder='Поиск по никнейму артисту...'
                    type='text'
                    isGray={true}
                    onChange={onChangeSearch}
                    value={search}
                />
                <Table
                    header={ ['артист', 'треки', 'рейтинг', 'действия'] }
                    data={data}
                    dataStatus={dataStatus}
                    actions={[
                        {
                            name: 'edit',
                            func: (id) => (
                            <div onClick={() => hundleUpdateArtist(id)}>
                                <EditIcon />
                            </div>
                            )
                        },
                        {
                            name: 'delete',
                            func: (id) => (
                            <div onClick={() => hundleDeleteArtist(id)}>
                                <DeleteIcon />
                            </div>
                            )
                        },
                    ]}
                />
                {
                    result?.artists?.length === 0 && <p className={styles.text}>Ничего не найдено</p>
                }
                {
                    artistListStatus === 'success' && artistListPagination &&
                        <div className={styles.bottom}>
                            <div className={styles.left}>
                                <p className={styles.text}>Показано {((artistListPagination.page - 1) * limit) + 1}-{limit * artistListPagination.page} из {artistListPagination.total}</p>
                            </div>
                            <PaginationButtons
                                page={artistListPagination.page}
                                totalPages={artistListPagination.totalPages}
                                hundleNextPage={hundleNextPage}
                                hundlePrevPage={hundlePrevPage}
                                hundlePage={hundlePage}
                            />
                        </div>
                }
                <Modal
                    width='520px'
                    modalTitle='Новый артист'
                    modalDesc='Заполните информацию об артисте'
                    modalOpen={createArtist}
                    modalClose={() => setCreateArtist(false)}
                >
                    {
                        artistListStatus === 'success' && artistList && artistListPagination &&
                        <ArtistCreateForm
                            artistListLength={artistList.length}
                            modalClose={() => setCreateArtist(false)}
                            lastPage={artistListPagination.totalPages}
                            limit={limit}
                        />
                    }
                </Modal>
                <Modal
                    width='520px'
                    modalTitle='Редактировать артиста'
                    modalDesc='Измените данные артиста'
                    modalOpen={updateArtist}
                    modalClose={() => setUpdateArtist(false)}
                >
                    {
                        artist && <ArtistUpdateForm artist={artist} modalClose={() => setUpdateArtist(false)} />
                    }
                </Modal>
                <Modal
                    width='420px'
                    modalTitle='Удалить артиста?'
                    modalDesc='Это действие нельзя отменить'
                    modalOpen={deleteArtist}
                    modalClose={() => setDeleteArtist(false)}
                >
                    { 
                        artistListStatus === 'success' && artistListPagination && artistList && artistId &&
                        <ArtistDeleteModal
                        artistListLength={artistList.length}
                        lastPage={artistListPagination.totalPages}
                        limit={limit} 
                        modalClose={() => setDeleteArtist(false)}
                        artistId={artistId}
                        />
                    }
                </Modal>
            </div>
        </div>
    )
}