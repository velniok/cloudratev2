import { Button, Cover, Input, ProfileIcon } from '@/shared/ui'
import styles from './ArtistCreateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { createArtistThunk } from '../model/slice'
import { IApiError } from '@/shared/types'
import { useNavigate } from 'react-router-dom'
import { IArtist } from '@/entities/artist'

interface ArtistCreateFormProps {
    modalClose: () => void
    lastPage: number
    limit: number
    artistListLength: number
}

export const ArtistCreateForm: FC<ArtistCreateFormProps> = ({ modalClose, lastPage, limit, artistListLength }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setValues(initialValues)
        setErrors(initialErrors)
    }, [modalClose])

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

        dispatch(createArtistThunk({
            name: values.name,
            avatarUrl: values.avatarUrl,
            soundcloudUrl: values.soundcloudUrl,
        })).unwrap()
            .then(() => {
                notify('Артист создан', 'Новый артист успешно добавлен', 'success')
                if (artistListLength === limit) {
                    navigate(`/admin/artists?page=${lastPage + 1}&limit=${limit}`)
                } else {
                    navigate(`/admin/artists?page=${lastPage}&limit=${limit}`)
                }
                hundleCancel(e)
            })
            .catch((err: IApiError) => {
                setErrors(prev => ({ ...prev, [err.field]: err.message }))
            })
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
                        isGray={true}
                        value={values.soundcloudUrl}
                        onChange={hundleChangeSoundcloudUrl}
                        error={errors.soundcloudUrl}
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
