import { Button, Cover, Input } from '@/shared/ui'
import styles from './ArtistUpdateForm.module.scss'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { updateAvatarApi } from '@/shared/api'
import { updateArtistThunk } from '../model/slice'
import { IArtist } from '@/entities/artist'
import { IApiError } from '@/shared/types'

interface ArtistUpdateFormProps {
    modalClose: () => void
    artist: IArtist
}

export const ArtistUpdateForm: FC<ArtistUpdateFormProps> = ({ modalClose, artist }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()

    useEffect(() => {
        setValues(prev => ({ ...prev, name: artist.name }))
        setValues(prev => ({ ...prev, avatarUrl: artist.avatarUrl }))
        setValues(prev => ({ ...prev, soundcloudUrl: artist.soundcloudUrl }))
        setErrors(initialErrors)
    }, [artist, modalClose])

    const inputRef = useRef<HTMLInputElement>(null)

    const initialValues = {
        name: '',
        avatarUrl: '',
        soundcloudUrl: '',
    }
    const [values, setValues] = useState(initialValues)
    
    const initialErrors = {
        name: '',
        avatarUrl: '',
        soundcloudUrl: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setValues(prev => ({ ...prev, avatarUrl: data.url }))
    }

    const hundleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, name: '' }))
        setValues(prev => ({ ...prev, name: e.target.value }))
    }

    const hundleChangeSoundcloudUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, soundcloudUrl: '' }))
        setValues(prev => ({ ...prev, soundcloudUrl: e.target.value }))
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!values.name) return setErrors(prev => ({ ...prev, name: 'Укажите никнейм артиста' }))
        if (!values.soundcloudUrl) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Укажите ссылку на SoundCloud артиста' }))
        if (!URL.canParse(values.soundcloudUrl)) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Неверный формат ссылки' }))

        dispatch(updateArtistThunk({
            id: artist.id,
            req: {
                name: values.name,
                avatarUrl: values.avatarUrl,
                soundcloudUrl: values.soundcloudUrl,
            }
        })).unwrap()
            .then(() => {
                notify('Артист изменён', 'Артист успешно изменён', 'edit')
                hundleCancel(e)
            })
            .catch((err: IApiError) => {
                setErrors(prev => ({ ...prev, [err.field]: err.message }))
            })
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setErrors(initialErrors)
        modalClose()
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
                    <div className={styles.editAvatar}>
                        <Cover width='64px' height='64px' borderRadius='12px' url={values.avatarUrl} isInput={true} />
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
                        value={values.name}
                        onChange={hundleChangeName}
                        error={errors.name}
                    />
                    <Input
                        label='SOUNDCLOUD артиста'
                        placeholder='Введите SoundCloud артиста'
                        type='text'
                        labelFontSize='10px'
                        inputFontSize='14px'
                        isGray={true}
                        value={values.soundcloudUrl}
                        onChange={hundleChangeSoundcloudUrl}
                        error={errors.soundcloudUrl}
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
