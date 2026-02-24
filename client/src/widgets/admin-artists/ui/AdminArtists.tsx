import { Button, DeleteIcon, EditIcon, Modal, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'
import { useNotification } from '@/shared/lib'
import { IArtist } from '@/entities/artist'
import { useState } from 'react'

export const AdminArtists = () => {

    const { notify } = useNotification()

    const [createArtist, setCreateArtist] = useState<boolean>(false)

    const artists: IArtist[] = [
        {
            id: '1',
            name: 'тёмный принц',
            soundcloudURL: '123',
            avgRating: 53,
            tracks: [
                {
                    id: 1,
                    title: 'песня птиц',
                    artist: 'тёмный принц',
                    rating: 23
                }
            ]
        },
        {
            id: '2',
            name: 'tewiq',
            soundcloudURL: '123',
            avgRating: 35,
            tracks: [
                {
                    id: 1,
                    title: 'песня птиц',
                    artist: 'тёмный принц',
                    rating: 23
                },
                {
                    id: 2,
                    title: 'песня птиц',
                    artist: 'тёмный принц',
                    rating: 23
                }
            ]
        }
    ]

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
                    tableName={'artist'}
                    data={artists}
                    actions={[
                        {
                            name: 'edit',
                            func: () => (
                            <div onClick={() => notify('Артист изменён', 'Данные артиста успешно обновлены', 'edit')}>
                                <EditIcon />
                            </div>
                            )
                        },
                        {
                            name: 'delete',
                            func: () => (
                            <div onClick={() => notify('Артист удалён', 'Артист успешно удалён', 'delete')}>
                                <DeleteIcon />
                            </div>
                            )
                        },
                    ]}
                />
                <Modal modalOpen={createArtist} modalClose={() => setCreateArtist(false)} />
            </div>
        </div>
    )
}