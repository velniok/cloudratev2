import { Button, Cover, Input, ProfileIcon } from '@/shared/ui'
import styles from './ArtistUpdateForm.module.scss'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { updateAvatarApi } from '@/shared/api'
import { getOneArtistThunk, updateArtistThunk } from '../model/slice'

interface ArtistUpdateFormProps {
    modalClose: () => void
    artistId: number
    setArtistId: (id: number | null) => void
}

export const ArtistUpdateForm: FC<ArtistUpdateFormProps> = ({ modalClose, artistId, setArtistId }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()

    useEffect(() => {
        if (artistId) {
            dispatch(getOneArtistThunk({ id: artistId })).unwrap()
                .then((res) => {
                    setName(res.artist.name)
                    setAvatarUrl(res.artist.avatarUrl)
                    setSoundcloudUrl(res.artist.soundcloudUrl)
                })
        }
    }, [artistId])

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
        dispatch(updateArtistThunk({
            id: artistId,
            req: {
                name: name,
                avatarUrl: avatarUrl,
                soundcloudUrl: soundcloudUrl,
            }
        })).unwrap()
            .then(() => {
                notify('Артист изменён', 'Артист успешно изменён', 'edit')
                hundleCancel(e)
            })
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        modalClose()
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
                    <div className={styles.editAvatar}>
                        <Cover width='64px' height='64px' borderRadius='12px' url={avatarUrl} isInput={true} />
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
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={handleSubmit}>СОХРАНИТЬ ИЗМЕНЕНИЯ</Button>
            </div>
        </form>
    )
}
