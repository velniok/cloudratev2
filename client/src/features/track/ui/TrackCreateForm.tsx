import { Button, ImgIcon, Input, SearchItem, SearchItemSkeleton } from '@/shared/ui'
import styles from './TrackCreateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { searchArtistsThunk, selectArtistList, selectArtistListStatus } from '@/features/artist'
import { IArtist } from '@/entities/artist'
import { createTrackThunk } from '../model/slice'

interface TrackCreateFormProps {
    modalClose: () => void
}

export const TrackCreateForm: FC<TrackCreateFormProps> = ({ modalClose }) => {

    const dispatch = useAppDispatch()
    const artistList = useAppSelector(selectArtistList)
    const artistListStatus = useAppSelector(selectArtistListStatus)
    const { notify } = useNotification()

    const inputRef = useRef<HTMLInputElement>(null)

    const [title, setTitle] = useState<string>('')
    const [coverUrl, setCoverUrl] = useState<string>('')
    const [searchArtist, setSearchArtist] = useState<string>('')
    const [addArtist, setAddArtists] = useState<IArtist[]>([])

    const [search, setSearch] = useState<boolean>(false)

    useEffect(() => {
        if (searchArtist !== '') {
            dispatch(searchArtistsThunk({ query: searchArtist })).unwrap()
                .then()
                .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
        }
    }, [searchArtist])
    
    const hundleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setCoverUrl(data.url)
    }

    const hundleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const hundleChangeSearchArtist = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchArtist(e.target.value)
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

        dispatch(createTrackThunk({
            title: title,
            coverUrl: coverUrl,
            artistIds: artistIds
        })).unwrap()
            .then(() => {
                notify('Трек создан', 'Новый трек успешно добавлен', 'success')
                hundleCancel(e)
            })
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        modalClose()
        setTitle('')
        setCoverUrl('')
        setSearchArtist('')
    }

    return (
        <form className={styles.form}>
            <div className={styles.content}>
                <div className={styles.inputList}>
                    <div className={styles.editCover}>
                        {
                            coverUrl
                            ?
                            <img src={`${coverUrl}`} alt="" className={styles.cover} />
                            :
                            <div className={styles.cover}>
                                <ImgIcon />
                            </div>
                        }
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
                        value={title}
                        onChange={hundleChangeTitle}
                    />
                    <div className={styles.search}>
                        <Input
                            label='АРТИСТ(-ы)'
                            placeholder='Поиск артиста...'
                            type='text'
                            labelFontSize='10px'
                            inputFontSize='14px'
                            isGray={true}
                            value={searchArtist}
                            onChange={hundleChangeSearchArtist}
                            onFocus={() => setSearch(true)}
                            onBlur={() => setSearch(false)}
                            isSearch={true}
                        >
                        <ul className={styles.addArtistList}>
                            {
                                addArtist.length > 0 &&
                                addArtist.map((artist) => {
                                    return (
                                        <li key={artist.id} className={styles.addArtistItem} onClick={() => onClickRemoveArtist(artist.id)}>
                                            <img src={`${artist.avatarUrl}`} alt="" className={styles.addArtistAvatar} />
                                            <p className={styles.addArtistName}>{artist.name}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </Input>
                        <div className={`${styles.search__artist} ${search ? styles.open : ''}`}>
                            <ul className={styles.search__list}>
                                {
                                    searchArtist !== '' ?
                                    <>
                                    {
                                        artistListStatus === 'success'
                                        ?
                                        <>
                                        {
                                            artistList.filter((artist) => !addArtist.some((addArtist) => addArtist.id === artist.id)).length > 0 ?
                                            artistList.map((artist) => {
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
