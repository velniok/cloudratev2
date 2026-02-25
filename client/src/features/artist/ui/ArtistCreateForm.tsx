import { Button, Input, ProfileIcon } from '@/shared/ui'
import styles from './ArtistCreateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { createArtistThunk } from '../model/slice'

interface ArtistCreateFormProps {
    modalClose: () => void
}

export const ArtistCreateForm: FC<ArtistCreateFormProps> = ({ modalClose }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()

    const inputRef = useRef<HTMLInputElement>(null)

    const [name, setName] = useState<string>('')
    const [avatarUrl, setAvatarUrl] = useState<string>('')
    const [soundcloudUrl, setSoundcloudUrl] = useState<string>('')
    
    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setAvatarUrl(data.url)
    }

    const hundleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const hundleChangeSoundcloudUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setSoundcloudUrl(e.target.value)
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(createArtistThunk({
            name: name,
            avatarUrl: avatarUrl,
            soundcloudUrl: soundcloudUrl,
        }))
        notify('Артист создан', 'Новый артист успешно добавлен', 'success')
        modalClose()
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        modalClose()
        setName('')
        setAvatarUrl('')
        setSoundcloudUrl('')
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
                    <div className={styles.editAvatar}>
                        {
                            avatarUrl
                            ?
                            <img src={`${avatarUrl}`} alt="" className={styles.avatar} />
                            :
                            <div className={styles.avatar}>
                                <ProfileIcon />
                            </div>
                        }
                        <div className={styles.avatarInput}>
                            <input ref={inputRef} hidden type="file" onChange={hundleAvatarChange} />
                            <Button fontSize='12px' color='default' padding='12px 16px 8px 16px' onClick={() => inputRef.current?.click()}>Загрузить новое фото</Button>
                            <p className={styles.sub}>JPG, PNG. До 5MB</p>
                        </div>
                    </div>
                    <Input
                        label='НИКНЕЙМ АРТИСТА'
                        placeholder='Введите никнейм артиста'
                        type='text'
                        labelFontSize='10px'
                        inputFontSize='14px'
                        isGray={true}
                        value={name}
                        onChange={hundleChangeName}
                    />
                    <Input
                        label='SOUNDCLOUD артиста'
                        placeholder='Введите SoundCloud артиста'
                        type='text'
                        labelFontSize='10px'
                        inputFontSize='14px'
                        isGray={true}
                        value={soundcloudUrl}
                        onChange={hundleChangeSoundcloudUrl}
                    />
                </div>
            </div>
            <div className={styles.footer}>
                <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={hundleCancel}>ОТМЕНА</Button>
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={handleSubmit}>СОЗДАТЬ АРТИСТА</Button>
            </div>
        </form>
    )
}
