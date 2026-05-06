import { Button, Cover, Input } from '@/shared/ui'
import styles from './ArtistCreateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { getOptimizedAvatar, useAppDispatch, useNotification } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { createArtistThunk } from '../model/slice'
import { IApiError } from '@/shared/types'
import { useNavigate } from 'react-router-dom'
import { IArtist } from '@/entities/artist'
import { getSoundсloudArtist } from '../api/artistApi'
import { updateSuggestionArtistThunk, updateSuggestionFeatThunk } from '@/features/suggestion'

interface ArtistCreateFormProps {
    modalClose: () => void
    lastPage?: number
    limit?: number
    artistListLength?: number
    suggestionId?: number | null
    tempId?: string | null
}

export const ArtistCreateForm: FC<ArtistCreateFormProps> = ({ modalClose, lastPage, limit, artistListLength, suggestionId, tempId }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setValues(initialValues)
        setErrors(initialErrors)
        setFindArtist(null)
        setUrlForInfo('')
    }, [modalClose])

    const initialValues = {
        name: '',
        avatarUrl: '',
        soundcloudUrl: '',
    }
    const [values, setValues] = useState(initialValues)

    const [urlForInfo, setUrlForInfo] = useState<string>('')
    const [soundcloudInfoLoading, setSoundcloudInfo] = useState<boolean>(false)
    const [findArtist, setFindArtist] = useState<IArtist | null>(null)

    const initialErrors = {
        name: '',
        avatarUrl: '',
        soundcloudUrl: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const hundleChangeUrlForInfo = (e: ChangeEvent<HTMLInputElement>) => {
        setUrlForInfo(e.target.value)
    }
    
    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0]
            const { data } = await updateAvatarApi(file)
            setValues(prev => ({ ...prev, avatarUrl: data.url }))
        }
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
            .then((res) => {
                notify('Артист создан', 'Новый артист успешно добавлен', 'success')
                if (suggestionId && tempId) {
                    dispatch(updateSuggestionFeatThunk({ id: suggestionId, tempId: tempId, req: res.artist }))
                } else if (suggestionId) {
                    dispatch(updateSuggestionArtistThunk({ id: suggestionId, req: res.artist }))
                } else if (lastPage) {
                    if (artistListLength === limit) {
                        navigate(`/admin/artists?page=${lastPage + 1}&limit=${limit}`)
                    } else {
                        navigate(`/admin/artists?page=${lastPage}&limit=${limit}`)
                    }
                }
                hundleCancel(e)
            })
            .catch((err: IApiError) => {
                setErrors(prev => ({ ...prev, [err.field ?? '']: err.message }))
            })
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        modalClose()
    }

    const hundleInfoTrack = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSoundcloudInfo(true)
        getSoundсloudArtist({ url: urlForInfo })
            .then((res) => {
                if (res.data.artist) {
                    setFindArtist(res.data.artist)
                }
                setValues(prev => ({
                    ...prev,
                    name: res.data.name ?? '',
                    soundcloudUrl: res.data.soundcloudUrl ?? '',
                    avatarUrl: res.data.avatarUrl ?? ''
                }))
                setSoundcloudInfo(false)
            })
    }

    const addToTrack = (e: MouseEvent<HTMLButtonElement>) => {
        if (!findArtist) return false
        if (suggestionId && tempId) {
            dispatch(updateSuggestionFeatThunk({ id: suggestionId, tempId: tempId, req: findArtist }))
        } else if (suggestionId) {
            dispatch(updateSuggestionArtistThunk({ id: suggestionId, req: findArtist }))
        }
        hundleCancel(e)
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
                    <div className={styles.soundcloud}>
                        <div className={styles.soundcloud__header}>
                            <div className={styles.soundcloud__logo}>
                                <i className='ph-fill ph-soundcloud-logo'></i>
                            </div>
                            <div className={styles.soundcloud__text}>
                                <h4 className={styles.soundcloud__title}>Загрузить из SoundCloud</h4>
                                <p className={styles.soundcloud__desc}>Вставьте ссылку на трек и мы автоматически заполним поля</p>
                            </div>
                        </div>
                        <div className={styles.soundcloud__form}>
                            <Input
                                placeholder='https://soundcloud.com/artist/track'
                                type='text'
                                isGray={true}
                                value={urlForInfo}
                                onChange={(e) => {hundleChangeUrlForInfo(e)}}
                                icon={<i className='ph ph-link'></i>}
                                focusColor='orange'
                            />
                            <Button
                                onClick={hundleInfoTrack}
                                color='orange'
                                padding='16px 24px 14px 24px'
                                icon={<i className='ph ph-cloud-arrow-down'></i>}
                                isLoading={soundcloudInfoLoading}
                            >Загрузить</Button>
                        </div>
                        {
                            findArtist &&
                            <div className={styles.soundcloud__artist}>
                                <Cover
                                    url={getOptimizedAvatar(findArtist.avatarUrl ?? '', 50, 50)}
                                    width='50px'
                                    height='50px'
                                    borderRadius='12px'
                                />
                                <p className={styles.soundcloud__artistName}>{findArtist.name}</p>
                                <Button color='orange' padding='14px 8px 12px 8px' onClick={addToTrack}>Добавить</Button>
                            </div>
                        }
                    </div>
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
                        isGray={true}
                        value={values.name}
                        onChange={hundleChangeName}
                        error={errors.name}
                    />
                    <Input
                        label='SOUNDCLOUD артиста'
                        placeholder='Введите SoundCloud артиста'
                        type='text'
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
