import { Button, Cover, Input } from '@/shared/ui'
import styles from './TrackUpdateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { updateAvatarApi } from '@/shared/api'
import { ITrack } from '@/entities/track'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { updateTrackThunk } from '../model/slice'

interface TrackUpdateFormProps {
    modalClose: () => void
    track: ITrack
}

export const TrackUpdateForm: FC<TrackUpdateFormProps> = ({ modalClose, track }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setTitle(track.title)
        setCoverUrl(track.coverUrl)
    }, [track])

    const [title, setTitle] = useState<string>('')
    const [coverUrl, setCoverUrl] = useState<string>('')

    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setCoverUrl(data.url)
    }

    const hundleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(updateTrackThunk({
            id: track.id,
            req: {
                title: title,
                coverUrl: coverUrl,
            }
        })).unwrap()
            .then(() => {
                notify('Трек изменён', 'Трек успешно изменён', 'edit')
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
                        <Cover width='64px' height='64px' borderRadius='12px' url={coverUrl} isInput={true} />
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
                        labelFontSize='10px'
                        inputFontSize='14px'
                        isGray={true}
                        value={title}
                        onChange={hundleChangeTitle}
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
