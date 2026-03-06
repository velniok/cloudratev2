import { Button, DeleteIcon, EditIcon, Input, Modal, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'
import { useAppDispatch, useAppSelector, useNotification, useSearch } from '@/shared/lib'
import { IArtist } from '@/entities/artist'
import { FC, useEffect, useState } from 'react'
import { TStatus } from '@/shared/types'
import { ArtistCreateForm, ArtistDeleteModal } from '@/features/artist'
import { ArtistUpdateForm } from '@/features/artist/ui/ArtistUpdateForm'
import { selectGeneral, selectGeneralStatus } from '@/features/general'
import { getArtistsCountThunk } from '@/features/general/model/slice'

interface AdminArtistsProps {
    artistList: IArtist[]
    artistListStatus: TStatus
}

export const AdminArtists: FC<AdminArtistsProps> = ({ artistList, artistListStatus }) => {

    const dispatch = useAppDispatch()
    const artistCount = useAppSelector(selectGeneral)?.artists
    const artistCountStatus = useAppSelector(selectGeneralStatus)
    const { result, resultStatus, search, onChangeSearch } = useSearch('artists')

    useEffect(() => {
        dispatch(getArtistsCountThunk())
    }, [artistList])

    useEffect(() => {
        if (!result || search === '') {
            setData(artistList)
            setDataStatus(artistListStatus)
        } else {
            setData(result.artists)
            setDataStatus(resultStatus)
        }
    }, [artistListStatus, artistList, result])

    const [data, setData] = useState(artistList)
    const [dataStatus, setDataStatus] = useState(artistListStatus)

    const [createArtist, setCreateArtist] = useState<boolean>(false)
    const [updateArtist, setUpdateArtist] = useState<boolean>(false)
    const [deleteArtist, setDeleteArtist] = useState<boolean>(false)

    const [artistId, setArtistId] = useState<number | null>(null)
    const [artist, setArtist] = useState<IArtist | null>(null)

    const hundleUpdateArtist = (id: number) => {
        setArtist(prev => prev = artistList.filter(artist => artist.id === id)[0])
        setUpdateArtist(true)
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
                        artistCountStatus === 'success' ? <p className={styles.count}>Всего: {artistCount} артистов</p> : <>Загрузка</>
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
                    isSearch={true}
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
                {/* {
                    result?.artists?.length === 0 && <p className={styles.text}>Ничего не найдено</p>
                } */}
                <div className={styles.bottom}>
                    <Button color='accent' padding='5px'>+</Button>
                    <Button color='accent' padding='5px'>-</Button>
                </div>
                <Modal
                    width='520px'
                    modalTitle='Новый артист'
                    modalDesc='Заполните информацию об артисте'
                    modalOpen={createArtist}
                    modalClose={() => setCreateArtist(false)}
                >
                    <ArtistCreateForm modalClose={() => setCreateArtist(false)} />
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
                    <ArtistDeleteModal modalClose={() => setDeleteArtist(false)} artistId={artistId} />
                </Modal>
            </div>
        </div>
    )
}