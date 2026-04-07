import { Button, Cover, Input } from '@/shared/ui'
import styles from './TrackUpdateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { updateAvatarApi } from '@/shared/api'
import { ITrack } from '@/entities/track'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { updateTrackThunk } from '../model/slice'
import { IApiError } from '@/shared/types'

interface TrackUpdateFormProps {
    modalClose: () => void
    track: ITrack
}

export const TrackUpdateForm: FC<TrackUpdateFormProps> = ({ modalClose, track }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const inputRef = useRef<HTMLInputElement>(null)

    
    const initialValues = {
        title: '',
        coverUrl: '',
        soundcloudUrl: '',
        releaseData: '',
    }
    const [values, setValues] = useState(initialValues)

    const initialErrors = {
        title: '',
        soundcloudUrl: '',
        releaseData: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    useEffect(() => {
        setValues(prev => ({ ...prev, title: track.title ?? '' }))
        setValues(prev => ({ ...prev, coverUrl: track.coverUrl ?? '' }))
        setValues(prev => ({ ...prev, soundcloudUrl: track.soundcloudUrl ?? '' }))
        setValues(prev => ({ ...prev, releaseData: track.releaseData ?? '' }))
    }, [track, modalClose])

    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
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

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!values.title) return setErrors(prev => ({ ...prev, title: 'Укажите название трека' }))
        if (!values.releaseData) return setErrors(prev => ({ ...prev, releaseData: 'Укажите дату релиза трека' }))

        dispatch(updateTrackThunk({
            id: track.id,
            req: {
                title: values.title,
                coverUrl: values.coverUrl,
                soundcloudUrl: values.soundcloudUrl,
                releaseData: values.releaseData,
            }
        })).unwrap()
            .then(() => {
                notify('Трек изменён', 'Трек успешно изменён', 'edit')
                hundleCancel(e)
            })
            .catch((err: IApiError) => setErrors(prev => ({ ...prev, [err.field ?? '']: err.message })))
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
                        <Cover width='64px' height='64px' borderRadius='12px' url={values.coverUrl} isInput={true} />
                        <div className={styles.avatarInput}>
                            <input ref={inputRef} hidden type="file" onChange={hundleAvatarChange} />
                            <Button fontSize='12px' color='default' padding='12px 16px 8px 16px' onClick={() => inputRef.current?.click()}>Загрузить новое фото</Button>
                            <p className={styles.sub}>JPG, PNG. До 5MB</p>
                        </div>
                    </div>
                    <Input
                        label='НАЗВАНИЕ ТРЕКА'
                        placeholder='Введите новое название трека'
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
                        placeholder='Введите новую дату релиза трека'
                        type='date'
                        isGray={true}
                        value={values.releaseData}
                        onChange={hundleChangeRelease}
                        error={errors.releaseData}
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
