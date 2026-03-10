import { Button, Cover, Input, SearchItem, SearchItemSkeleton } from '@/shared/ui'
import styles from './TrackCreateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react'
import { useAppDispatch, useNotification, useSearch } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { IArtist } from '@/entities/artist'
import { createTrackThunk } from '../model/slice'
import { IApiError } from '@/shared/types'
import { useNavigate } from 'react-router-dom'

interface TrackCreateFormProps {
    modalClose: () => void
    trackListLength: number
    lastPage: number
    limit: number
}

export const TrackCreateForm: FC<TrackCreateFormProps> = ({ modalClose, trackListLength, lastPage, limit }) => {

    const { result, resultStatus, search, onChangeSearch, setSearch  } = useSearch('artists')

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)

    const initialErrors = {
        title: '',
        artistIds: '',
        releaseData: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const initialValues = {
        title: '',
        coverUrl: '',
        releaseData: '',
    }
    const [values, setValues] = useState(initialValues)

    const [addArtist, setAddArtists] = useState<IArtist[]>([])

    const [searchList, setSearchList] = useState<boolean>(false)
    
    const hundleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setValues(prev => ({ ...prev, coverUrl: data.url }))
    }

    const hundleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, title: '' }))
        setValues(prev => ({ ...prev, title: e.target.value }))
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
            return String(addArtist.id)
        })

        if (!values.title) return setErrors(prev => ({ ...prev, title: 'Укажите название трека' }))
        if (artistIds.length === 0) return setErrors(prev => ({ ...prev, artistIds: 'Укажите хотя бы одного артиста' }))
        if (!values.releaseData) return setErrors(prev => ({ ...prev, releaseData: 'Укажите дату релиза трека' }))
        dispatch(createTrackThunk({
            title: values.title,
            coverUrl: values.coverUrl,
            artistIds: artistIds,
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
            .catch((err: IApiError) => setErrors(prev => ({ ...prev, [err.field]: err.message })))
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        modalClose()
        setValues(initialValues)
        setAddArtists([])
        setErrors(initialErrors)
        setSearch('')
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
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
                        placeholder='Введите никнейм артиста'
                        type='text'
                        labelFontSize='10px'
                        inputFontSize='14px'
                        isGray={true}
                        value={values.title}
                        onChange={hundleChangeTitle}
                        error={errors.title}
                    />
                    <Input
                        label='ДАТА РЕЛИЗА'
                        placeholder='Введите дату релиза трека'
                        type='date'
                        labelFontSize='10px'
                        inputFontSize='14px'
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
                            labelFontSize='10px'
                            inputFontSize='14px'
                            isGray={true}
                            value={search}
                            onChange={onChangeSearch}
                            onFocus={() => {setErrors(prev => ({ ...prev, artistIds: '' })); setSearchList(true)}}
                            onBlur={() => setSearchList(false)}
                            isSearch={true}
                            error={errors.artistIds}
                        >
                        <ul className={styles.addArtistList}>
                            {
                                addArtist.length > 0 &&
                                addArtist.map((artist) => {
                                    return (
                                        <li key={artist.id} className={styles.addArtistItem} onClick={() => onClickRemoveArtist(artist.id)}>
                                            <Cover width='22px' height='22px' borderRadius='50%' url={artist.avatarUrl} />
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
                                            result.artists.filter((artist) => !addArtist.some((addArtist) => addArtist.id === artist.id)).length > 0 ?
                                            result.artists.map((artist) => {
                                                if (!addArtist.some((addArtist) => addArtist.id === artist.id)) {
                                                    return (
                                                        <SearchItem key={artist.id} data={artist} onClick={() => onClickAddArtist(artist)} /> 
                                                    )
                                                }
                                            })
                                            :
                                            <>Ничего не найдено</>
                                        }
                                        </>
                                        :
                                        Array.from({ length: 5 }).map((_, index) => {
                                            return <SearchItemSkeleton key={index} />
                                        })
                                    }
                                    </>
                                    :
                                    <>Пишите</>
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
