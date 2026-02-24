import { Button, DeleteIcon, EditIcon, Modal, PlusIcon, Table, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'
import { useNotification } from '@/shared/lib'
import { IArtist } from '@/entities/artist'
import { FC, useState } from 'react'
import { TStatus } from '@/shared/types'

interface AdminArtistsProps {
    artistList: IArtist[]
    artistListStatus: TStatus
}

export const AdminArtists: FC<AdminArtistsProps> = ({ artistList, artistListStatus }) => {

    const { notify } = useNotification()

    const [createArtist, setCreateArtist] = useState<boolean>(false)

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
                {
                    artistListStatus === 'success'
                    ?
                    <Table
                        header={ ['артист', 'треки', 'рейтинг', 'действия'] }
                        tableName={'artist'}
                        data={artistList}
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
                    : <>Загрузка...</>
                }
                <Modal modalOpen={createArtist} modalClose={() => setCreateArtist(false)} />
            </div>
        </div>
    )
}