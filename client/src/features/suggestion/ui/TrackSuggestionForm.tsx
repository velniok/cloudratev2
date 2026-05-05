import { Button, Cover, Input } from '@/shared/ui'
import styles from './TrackSuggestionForm.module.scss'
import { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { getOptimizedAvatar, useNotification, useSearch } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { IArtist, ITempArtist } from '@/entities/artist'
import { trackSuggestionApi } from '@/features/suggestion'
import { getSoundсloudTrack } from '../../track/api/trackApi'
import { IApiError } from '@/shared/types'
import { SearchArtistListToTrack, SearchArtistsToTrack } from '@/entities/search'

export const TrackSuggestionForm = () => {

    const { notify } = useNotification()
    const { result, resultStatus, search, onChangeSearch, setSearch } = useSearch('artists')
    const [searchList, setSearchList] = useState<boolean>(false)

    const [soundcloudUrl, setSoundcloudUrl] = useState<string>('')
    const [soundcloudUrlError, setSoundcloudUrlError] = useState<string>('')
    const [soundcloudLoading, setSoundcloudLoading] = useState<boolean>(false)
    const [artists, setArtists] = useState<(IArtist | ITempArtist)[]>([])

    const initialErrors = {
        title: '',
        artistIds: '',
        soundcloudUrl: '',
        releaseData: '',
        coverUrl: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const initValues = {
        title: '',
        coverUrl: '',
        soundcloudUrl: '',
        releaseData: '',
    }
    const [values, setValues] = useState(initValues)

    const inputRef = useRef<HTMLInputElement>(null)

    const hundleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files?.[0]
            const { data } = await updateAvatarApi(file)
            setValues(prev => ({ ...prev, coverUrl: data.url }))
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, title: '' }))
        setValues((prev) => ({...prev, title: e.target.value}))
    }

    const onChangeReleaseData = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, releaseData: '' }))
        setValues((prev) => ({...prev, releaseData: e.target.value}))
    }

    const onChangeSoundcloudUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, soundcloudUrl: '' }))
        setValues((prev) => ({...prev, soundcloudUrl: e.target.value}))
    }

    const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!values.title) return setErrors(prev => ({ ...prev, title: 'Укажите название трека' }))
        if (!values.soundcloudUrl) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Укажите ссылку на SoundCloud трека' }))
        if (!URL.canParse(values.soundcloudUrl)) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Неверный формат ссылки' }))
        if (!values.coverUrl) return setErrors(prev => ({ ...prev, coverUrl: 'Выберите обложку для трека' }))
        if (artists.length === 0) return setErrors(prev => ({ ...prev, artistIds: 'Укажите хотя бы одного артиста' }))
        if (!values.releaseData) return setErrors(prev => ({ ...prev, releaseData: 'Укажите дату релиза трека' }))

        let tempArtist:ITempArtist | null = null
        const tempFeatArtists:ITempArtist[] = []

        const artistsIds = artists.map((artist) => {
            if (artist.temp === false) return artist.id
            if (artist.temp === true && !tempArtist) tempArtist = artist
            if (artist.temp === true && tempArtist) tempFeatArtists.push(artist)
            return null
        })

        console.log(tempArtist)

        trackSuggestionApi({
            title: values.title,
            coverUrl: values.coverUrl,
            soundcloudUrl: values.soundcloudUrl,
            releaseData: values.releaseData,
            artistId: artistsIds[0],
            featArtistIds: artistsIds.slice(1),
            tempArtist: tempArtist,
            tempFeatArtists: tempFeatArtists
        })
            .then(() => {
                notify('Заявка отправлена', 'Заявка успешно была отправлена', 'success')
                setValues(initValues)
                setArtists([])
            })
    }

    const getInfo = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (soundcloudLoading) return false
        if (!soundcloudUrl) return setSoundcloudUrlError('Укажите ссылку на SoundCloud трека')
        if (!URL.canParse(soundcloudUrl)) return setSoundcloudUrlError('Неверный формат ссылки')
        
        setSoundcloudLoading(true)
        getSoundсloudTrack({ url: soundcloudUrl })
            .then((res) => {
                setValues(prev => ({
                    ...prev,
                    title: res.data.title ?? '',
                    soundcloudUrl: res.data.soundcloudUrl ?? '',
                    releaseData: res.data.releaseData?.split('T')[0] ?? '',
                    coverUrl: res.data.coverUrl ?? ''
                }))
                setSoundcloudLoading(false)
            })
            .catch((err: { response: { data: IApiError } }) => {
                setSoundcloudUrlError(err.response.data.message)
                setSoundcloudLoading(false)
            })
    }

    return (
        <div className={styles.wrapper}>
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
                <form className={styles.soundcloud__form}>
                    <Input
                        placeholder='https://soundcloud.com/artist/track'
                        type='text'
                        isGray={true}
                        value={soundcloudUrl}
                        onChange={(e) => {setSoundcloudUrlError(''); setSoundcloudUrl(e.target.value)}}
                        icon={<i className='ph ph-link'></i>}
                        error={soundcloudUrlError}
                        focusColor='orange'
                    />
                    <Button
                        onClick={getInfo}
                        color='orange'
                        padding='16px 24px 14px 24px'
                        icon={<i className='ph ph-cloud-arrow-down'></i>}
                        isLoading={soundcloudLoading}
                    >Загрузить</Button>
                </form>
            </div>
            <form className={styles.form}>
                <h4 className={styles.form__header}>ИЛИ ВРУЧНУЮ</h4>
                <div className={styles.form__content}>
                    <h5 className={styles.form__title}>
                        <i className='ph ph-music-notes-simple'></i>
                        Информация о треке
                    </h5>
                    <div className={styles.form__inputs}>
                        <Input
                            label='Название трека'
                            placeholder='Введите название трека'
                            type='text'
                            icon={<i className='ph ph-music-notes'></i>}
                            onChange={onChangeTitle}
                            value={values.title}
                            error={errors.title}
                        />
                        <div className={styles.form__search}>
                            <Input
                                label='Арист(-ы)'
                                placeholder='Введите артиста(-ов)'
                                type='text'
                                icon={<i className='ph ph-user'></i>}
                                onChange={onChangeSearch}
                                value={search}
                                onFocus={() => setSearchList(true)}
                                onBlur={() => setSearchList(false)}
                                error={errors.artistIds}
                            >
                            {
                                artists.length > 0 &&
                                <SearchArtistListToTrack
                                    artists={artists}
                                    setArtists={setArtists}
                                />
                            }
                            </Input>
                            <SearchArtistsToTrack
                                searchList={searchList}
                                search={search}
                                resultStatus={resultStatus}
                                result={result?.artists}
                                setSearch={setSearch}
                                setErrors={setErrors}
                                artists={artists}
                                setArtists={setArtists}
                            />
                        </div>
                        <Input
                            label='Ссылка на SoundCloud трека'
                            placeholder='Введите ссылку на SoundCloud трека'
                            type='text'
                            icon={<i className='ph ph-link'></i>}
                            onChange={onChangeSoundcloudUrl}
                            value={values.soundcloudUrl}
                            error={errors.soundcloudUrl}
                        />
                        <Input
                            label='Дата релиза'
                            placeholder='Введите дату релиза'
                            type='date'
                            icon={<i className='ph ph-calendar-blank'></i>}
                            onChange={onChangeReleaseData}
                            value={values.releaseData}
                            error={errors.releaseData}
                        />
                    </div>
                </div>
                <div className={styles.form__content}>
                    <h5 className={styles.form__title}>
                        <i className='ph ph-image'></i>
                        Обложка
                    </h5>
                    <div className={`${styles.form__cover} ${values.coverUrl ? styles.active : ''}`} onClick={() => inputRef.current?.click()}>
                        <input ref={inputRef} hidden type="file" onChange={hundleCoverChange} />
                        {
                            values.coverUrl &&
                            <Cover
                                className={styles.form__coverUpload}
                                borderRadius='12px'
                                width='300px'
                                height='300px'
                                url={getOptimizedAvatar(values.coverUrl, 300, 300)}
                            />
                        }
                        <div className={styles.form__coverContainer}>
                            <div className={styles.form__coverLogo}>
                                <i className="ph ph-cloud-arrow-up"></i>
                            </div>
                            <p className={styles.form__coverTitle}>Перетащите обложку сюда</p>
                            <p className={styles.form__coverDesc}>или нажмите для выбора файла</p>
                        </div>
                    </div>
                </div>
                <div className={styles.form__footer}>
                    <Button onClick={onSubmit} icon={<i className='ph ph-paper-plane-tilt'></i>} color='accent' padding='16px 24px 14px 24px'>Отправить на модерацию</Button>
                </div>
            </form>
        </div>
    )
}
