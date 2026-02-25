import { Button, DeleteIcon, EditIcon, Modal, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'
import { useNotification } from '@/shared/lib'
import { IArtist } from '@/entities/artist'
import { FC, useState } from 'react'
import { TStatus } from '@/shared/types'
import { ArtistCreateForm, ArtistDeleteModal } from '@/features/artist'
import { ArtistUpdateForm } from '@/features/artist/ui/ArtistUpdateForm'

interface AdminArtistsProps {
    artistList: IArtist[]
    artistListStatus: TStatus
}

export const AdminArtists: FC<AdminArtistsProps> = ({ artistList, artistListStatus }) => {

    const [createArtist, setCreateArtist] = useState<boolean>(false)
    const [updateArtist, setUpdateArtist] = useState<boolean>(false)
    const [deleteArtist, setDeleteArtist] = useState<boolean>(false)
    const [artistId, setArtistId] = useState<number | null>(null)

    const hundleUpdateArtist = (id: number) => {
        setArtistId((prev) => prev = id)
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
                    <Button color='accent' padding='10px 20px 10px 20px' onClick={() => setCreateArtist(true)}>
                        <div className={styles.buttonInner}>
                            <PlusIcon />
                            <div className={styles.buttonText}>Добавить артиста</div>
                        </div>
                    </Button>
                </div>
                <Table
                    header={ ['артист', 'треки', 'рейтинг', 'действия'] }
                    data={artistList}
                    dataStatus={artistListStatus}
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
                    <ArtistUpdateForm modalClose={() => setUpdateArtist(false)} artistId={artistId} setArtistId={setArtistId} />
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