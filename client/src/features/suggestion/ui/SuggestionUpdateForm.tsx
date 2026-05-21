import { Button, Cover, Input } from '@/shared/ui'
import styles from './SuggestionUpdateForm.module.scss'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { updateAvatarApi } from '@/shared/api'
import { ISuggestion } from '@/entities/suggestion'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { updateSuggestionThunk } from '../model/slice'
import { IApiError } from '@/shared/types'

interface SuggestionUpdateFormProps {
    modalClose: () => void
    suggestion: ISuggestion
}

export const SuggestionUpdateForm: FC<SuggestionUpdateFormProps> = ({ suggestion, modalClose }) => {

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

    const [coverFile, setCoverFile] = useState<File | null>(null)

    useEffect(() => {
        setValues(prev => ({ ...prev, title: suggestion.title ?? '' }))
        setValues(prev => ({ ...prev, coverUrl: suggestion.coverUrl ?? '' }))
        setValues(prev => ({ ...prev, soundcloudUrl: suggestion.soundcloudUrl ?? '' }))
        setValues(prev => ({ ...prev, releaseData: suggestion.releaseData ?? '' }))
    }, [suggestion])

    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files?.[0]
            setCoverFile(file)
            setValues(prev => ({ ...prev, coverUrl: URL.createObjectURL(file) }))
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

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let coverUrl: string = ''
        if (coverFile) {
            const { data } = await updateAvatarApi(coverFile, 'track')
            coverUrl = data.url
        }

        if (!values.title) return setErrors(prev => ({ ...prev, title: 'Укажите название трека' }))
        if (!values.releaseData) return setErrors(prev => ({ ...prev, releaseData: 'Укажите дату релиза трека' }))
        if (!values.soundcloudUrl) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Укажите ссылку на SoundCloud трека' }))
        if (!URL.canParse(values.soundcloudUrl)) return setErrors(prev => ({ ...prev, soundcloudUrl: 'Неверный формат ссылки' }))

        dispatch(updateSuggestionThunk({
            id: suggestion.id,
            req: {
                title: values.title,
                coverUrl: coverUrl,
                soundcloudUrl: values.soundcloudUrl,
                releaseData: values.releaseData,
            }
        })).unwrap()
            .then(() => {
                notify('Заявка изменена', 'Заявка успешно изменена', 'edit')
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
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={onSubmit}>СОХРАНИТЬ ИЗМЕНЕНИЯ</Button>
            </div>
        </form>
    )
}
