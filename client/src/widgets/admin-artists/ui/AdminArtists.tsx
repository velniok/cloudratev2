import { Button, Input, Modal, PaginationButtons, PlusIcon, Skeleton, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'
import { useAppSelector, usePagination } from '@/shared/lib'
import { ArtistRowAdmin, IArtist } from '@/entities/artist'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { ArtistCreateForm, ArtistDeleteModal, getArtistListThunk, selectArtistList, selectArtistListPagination, selectArtistListStatus } from '@/features/artist'
import { ArtistUpdateForm } from '@/features/artist/ui/ArtistUpdateForm'

export const AdminArtists = () => {

    const artistList = useAppSelector(selectArtistList)
    const artistListPagination = useAppSelector(selectArtistListPagination)
    const artistListStatus = useAppSelector(selectArtistListStatus)

    const { hundleNextPage, hundlePrevPage, hundlePage, limit, hundleSearch, search } = usePagination(getArtistListThunk, '/admin/artists', 10, undefined, undefined, true)
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        hundleSearch(e.target.value)
    }

    const [createArtist, setCreateArtist] = useState<boolean>(false)
    const [updateArtist, setUpdateArtist] = useState<boolean>(false)
    const [deleteArtist, setDeleteArtist] = useState<boolean>(false)

    const [artistId, setArtistId] = useState<number | null>(null)
    const [artist, setArtist] = useState<IArtist | null>(null)

    const hundleUpdateArtist = (e: MouseEvent, id: number) => {
        e.preventDefault()
        if (artistList) {
            setArtist(prev => prev = artistList.filter(artist => artist.id === id)[0])
            setUpdateArtist(true)
        }
    }

    const hundleDeleteArtist = (e: MouseEvent, id: number) => {
        e.preventDefault()
        setArtistId((prev) => prev = id)
        setDeleteArtist(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.top}>
                    <Title>АРТИСТЫ</Title>
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
                <ul className={styles.header}>
                    <li className={styles.header__item}>ID</li>
                    <li className={styles.header__item}>АРТИСТ</li>
                    <li className={styles.header__item}>РЕЙТИНГ</li>
                    <li className={styles.header__item}>ТРЕКИ</li>
                    <li className={styles.header__item} style={{ textAlign: 'right' }}>ДЕЙСТВИЯ</li>
                </ul>
                {
                    artistListStatus === 'success' && artistList && artistListPagination ?
                    <>
                        <ul className={styles.list}>
                            {
                                artistList.map((artist) => {
                                    return <ArtistRowAdmin
                                        key={artist.id}
                                        artist={artist}
                                        hundleUpdateArtist={(e: MouseEvent, id: number) => hundleUpdateArtist(e, id)}
                                        hundleDeleteArtist={(e: MouseEvent, id: number) => hundleDeleteArtist(e, id)}
                                    />
                                })
                            }
                        </ul>
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