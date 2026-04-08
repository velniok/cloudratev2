import { Button, Cover, Input, SearchItem, SearchItemSkeleton } from '@/shared/ui'
import styles from './TrackCreateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react'
import { useAppDispatch, useNotification, useSearch } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { IArtist } from '@/entities/artist'
import { createTrackThunk } from '../model/slice'
import { IApiError } from '@/shared/types'
import { useNavigate } from 'react-router-dom'
import { getSoundсloudTrack } from '../api/trackApi'

interface TrackCreateFormProps {
    modalClose: () => void
    trackListLength: number
    lastPage: number
    limit: number
}

export const TrackCreateForm: FC<TrackCreateFormProps> = ({ modalClose, trackListLength, lastPage, limit }) => {

    const { result, resultStatus, search, onChangeSearch, setSearch } = useSearch('artists')

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)

    const initialErrors = {
        title: '',
        artistIds: '',
        soundcloudUrl: '',
        releaseData: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const initialValues = {
        title: '',
        coverUrl: '',
        soundcloudUrl: '',
        releaseData: '',
    }
    const [values, setValues] = useState(initialValues)

    const [urlForInfo, setUrlForInfo] = useState<string>('')
    const [soundcloudInfoLoading, setSoundcloudInfo] = useState<boolean>(false)

    const [addArtist, setAddArtists] = useState<IArtist[]>([])

    const [searchList, setSearchList] = useState<boolean>(false)
    
    const hundleChangeUrlForInfo = (e: ChangeEvent<HTMLInputElement>) => {
        setUrlForInfo(e.target.value)
    }
    
    const hundleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files?.[0]
            const { data } = await updateAvatarApi(file)
            setValues(prev => ({ ...prev, coverUrl: data.url }))
        }
    }

    const hundleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, title: '' }))
        setValues(prev => ({ ...prev, title: e.target.value }))
    }

    const hundleChangeSoundcloudUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, soundcloudUrl: '' }))
        setValues(prev => ({ ...prev, soundcloudUrl: e.target.value }))
    }

    const hundleChangeRelease = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, releaseData: '' }))
        setValues(prev => ({ ...prev, releaseData: e.target.value }))
    }

    const onClickAddArtist = (artist: IArtist) => {
        setAddArtists((prev) => [...prev, artist])
    }

    const onClickRemoveArtist = (id: number) => {
        setAddArtists((prev) => prev = prev.filter((artist) => artist.id !== id))
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const artistIds = addArtist.map((addArtist) => {
            return Number(addArtist.id)
        })

        if (!values.title) return setErrors(prev => ({ ...prev, title: 'Укажите название трека' }))
        if (!values.soundcloudUrl) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Укажите ссылку на SoundCloud трека' }))
        if (!URL.canParse(values.soundcloudUrl)) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Неверный формат ссылки' }))
        if (artistIds.length === 0) return setErrors(prev => ({ ...prev, artistIds: 'Укажите хотя бы одного артиста' }))
        if (!values.releaseData) return setErrors(prev => ({ ...prev, releaseData: 'Укажите дату релиза трека' }))

        dispatch(createTrackThunk({
            title: values.title,
            coverUrl: values.coverUrl,
            soundcloudUrl: values.soundcloudUrl,
            artistId: artistIds[0],
            featArtistIds: artistIds.slice(1), 
            releaseData: values.releaseData,
        })).unwrap()
            .then(() => {
                notify('Трек создан', 'Новый трек успешно добавлен', 'success')
                if (trackListLength === limit) {
                    navigate(`/admin/tracks?page=${lastPage + 1}&limit=${limit}`)
                } else {
                    navigate(`/admin/tracks?page=${lastPage}&limit=${limit}`)
                }
                hundleCancel(e)
            })
            .catch((err: IApiError) => setErrors(prev => ({ ...prev, [err.field ?? '']: err.message })))
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        modalClose()
        setValues(initialValues)
        setAddArtists([])
        setErrors(initialErrors)
        setSearch('')
        setUrlForInfo('')
    }

    const hundleInfoTrack = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSoundcloudInfo(true)
        getSoundсloudTrack({ url: urlForInfo })
            .then((res) => {
                setValues(prev => ({
                    ...prev,
                    title: res.data.title ?? '',
                    soundcloudUrl: res.data.soundcloudUrl ?? '',
                    releaseData: res.data.releaseData?.split('T')[0] ?? '',
                    coverUrl: res.data.coverUrl ?? ''
                }))
                setSoundcloudInfo(false)
            })
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
                    <Input
                        label='Получить информацию о треке через ссылку'
                        placeholder='Введите ссылку на SoundCloud трека'
                        type='text'
                        isGray={true}
                        value={urlForInfo}
                        onChange={hundleChangeUrlForInfo}
                    />
                    <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={hundleInfoTrack}>
                        {
                            soundcloudInfoLoading ? 'Загрузка..' : 'ПОЛУЧИТЬ ИНФО'
                        }
                    </Button>
                    <div className={styles.editCover}>
                        <Cover width='64px' height='64px' borderRadius='12px' url={values.coverUrl} isInput={true} />
                        <div className={styles.coverInput}>
                            <input ref={inputRef} hidden type="file" onChange={hundleCoverChange} />
                            <Button fontSize='12px' color='default' padding='12px 16px 8px 16px' onClick={() => inputRef.current?.click()}>Загрузить новую обложку</Button>
                            <p className={styles.sub}>JPG, PNG. До 5MB</p>
                        </div>
                    </div>
                    <Input
                        label='НАЗВАНИЕ ТРЕКА'
                        placeholder='Введите название трека'
                        type='text'
                        isGray={true}
                        value={values.title}
                        onChange={hundleChangeTitle}
                        error={errors.title}
                    />
                    <Input
                        label='ССЫЛКА НА SoundCloud трека'
                        placeholder='Введите ссылку на SoundCloud трека'
                        type='text'
                        isGray={true}
                        value={values.soundcloudUrl}
                        onChange={hundleChangeSoundcloudUrl}
                        error={errors.soundcloudUrl}
                    />
                    <Input
                        label='ДАТА РЕЛИЗА'
                        placeholder='Введите дату релиза трека'
                        type='date'
                        isGray={true}
                        value={values.releaseData}
                        onChange={hundleChangeRelease}
                        error={errors.releaseData}
                    />
                    <div className={styles.search}>
                        <Input
                            label='АРТИСТ(-ы)'
                            placeholder='Поиск артиста...'
                            type='text'
                            isGray={true}
                            value={search}
                            onChange={onChangeSearch}
                            onFocus={() => {setErrors(prev => ({ ...prev, artistIds: '' })); setSearchList(true)}}
                            onBlur={() => setSearchList(false)}
                            error={errors.artistIds}
                        >
                        <ul className={styles.addArtistList}>
                            {
                                addArtist.length > 0 &&
                                addArtist.map((artist) => {
                                    return (
                                        <li key={artist.id} className={styles.addArtistItem} onClick={() => onClickRemoveArtist(artist.id)}>
                                            <Cover width='22px' height='22px' borderRadius='50%' url={artist.avatarUrl ?? undefined} />
                                            <p className={styles.addArtistName}>{artist.name}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </Input>
                        <div className={`${styles.search__artist} ${searchList ? styles.open : ''}`}>
                            <ul className={styles.search__list}>
                                {
                                    search !== '' ?
                                    <>
                                    {
                                        resultStatus === 'success'
                                        ?
                                        <>
                                        {
                                            result?.artists.filter((artist) => !addArtist.some((addArtist) => addArtist.id === artist.id))?.length ?
                                            result?.artists.map((artist) => {
                                                if (!addArtist.some((addArtist) => addArtist.id === artist.id)) {
                                                    return (
                                                        <SearchItem key={artist.id} data={artist} onClick={() => onClickAddArtist(artist)} /> 
                                                    )
                                                }
                                            })
                                            :
                                            <p className={styles.search__text}>Ничего не найдено</p>
                                        }
                                        </>
                                        :
                                        Array.from({ length: 5 }).map((_, index) => {
                                            return <SearchItemSkeleton key={index} />
                                        })
                                    }
                                    </>
                                    :
                                    <p className={styles.search__text}>Начните писать для поиска...</p>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={hundleCancel}>ОТМЕНА</Button>
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={handleSubmit}>СОЗДАТЬ ТРЕК</Button>
            </div>
        </form>
    )
}