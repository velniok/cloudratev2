import { Button, Cover, Input, LinkIcon } from '@/shared/ui'
import styles from './TrackSuggestionForm.module.scss'
import { ChangeEvent, useRef, useState } from 'react'
import { getOptimizedAvatar, useSearch } from '@/shared/lib'
import { updateAvatarApi } from '@/shared/api'
import { ArtistRow } from '@/entities/artist'

export const TrackSuggestionForm = () => {

    const { result, resultStatus, search, onChangeSearch, setSearch  } = useSearch('artists')
    const [searchList, setSearchList] = useState<boolean>(false)

    const [soundcloudUrl, setSoundcloudUrl] = useState<string>('')

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
        setValues((prev) => ({...prev, title: e.target.value}))
    }

    const onChangeReleaseData = (e: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({...prev, releaseData: e.target.value}))
    }

    const onChangeSoundcloudUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({...prev, soundcloudUrl: e.target.value}))
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
                        onChange={(e) => setSoundcloudUrl(e.target.value)}
                        icon={<i className='ph ph-link'></i>}
                        error={null}
                        focusColor='orange'
                    />
                    <Button color='orange' padding='16px 24px 14px 24px' icon={<i className='ph ph-cloud-arrow-down'></i>}>Загрузить</Button>
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
                            />
                            {
                                searchList &&
                                <div className={styles.form__searchWrapper}>
                                    {
                                        search !== '' ?
                                        resultStatus === 'success' &&
                                        <>
                                            {
                                                result?.artists.length ?
                                                result.artists.map((artist) => {
                                                    return <ArtistRow key={artist.id} artist={artist} />
                                                })
                                                :
                                                <>Ничего не найдено</>
                                            }
                                        </>
                                        :
                                        <>Пишите</>
                                    }
                                </div>
                            }
                        </div>
                        <Input
                            label='Ссылка на SoundCloud трека'
                            placeholder='Введите ссылку на SoundCloud трека'
                            type='text'
                            icon={<i className='ph ph-link'></i>}
                            onChange={onChangeSoundcloudUrl}
                            value={values.soundcloudUrl}
                        />
                        <Input
                            label='Дата релиза'
                            placeholder='Введите дату релиза'
                            type='date'
                            icon={<i className='ph ph-calendar-blank'></i>}
                            onChange={onChangeReleaseData}
                            value={values.releaseData}
                        />
                    </div>
                </div>
                <div className={styles.form__content}>
                    <h5 className={styles.form__title}>
                        <i className='ph ph-image'></i>
                        Обложка
                    </h5>
                    <div className={styles.form__cover} onClick={() => inputRef.current?.click()}>
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
                    <Button icon={<i className='ph ph-paper-plane-tilt'></i>} color='accent' padding='16px 24px 14px 24px'>Отправить на модерацию</Button>
                </div>
            </form>
        </div>
    )
}
