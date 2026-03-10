import { Button, Cover, Input, Title } from '@/shared/ui'
import styles from './EditProfileForm.module.scss'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react'
import { IUser } from '@/entities/user'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { updateUserThunk } from '../model/slice'
import { updateAvatarApi } from '@/shared/api'
import { IApiError } from '@/shared/types'

interface EditProfileFormProps {
    user: IUser
}

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification() 
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)

    const initialValues = {
        nickname: `${user.nickname}`,
        username: `${user.username}`,
        avatarUrl: `${user.avatarUrl}`,
        email: `${user.email}`,
        password: '',
        confirmPassword: '',
    }
    const [values, setValues] = useState(initialValues)

    const initialErrors = {
        nickname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, nickname: '' }))
        setValues(prev => ({ ...prev, nickname: e.target.value }))
    }

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, username: '' }))
        setValues(prev => ({ ...prev, username: e.target.value }))
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, email: '' }))
        setValues(prev => ({ ...prev, email: e.target.value }))
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, password: '' }))
        setValues(prev => ({ ...prev, password: e.target.value }))
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, confirmPassword: '' }))
        setValues(prev => ({ ...prev, confirmPassword: e.target.value }))
    }

    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setValues(prev => ({ ...prev, avatarUrl: data.url }))
    }

    const hundleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        if (values.nickname.length < 4) return setErrors(prev => ({ ...prev, nickname: 'Никнейм должен содержать минимум 4 символа' }))
        if (!/\S+@\S+\.\S+/.test(values.email)) return setErrors(prev => ({ ...prev, email: 'Неверный формат email' }))
        if (values.password && values.password.length < 6) return setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум 6 символа' }))
        if (values.password !== values.confirmPassword) return setErrors(prev => ({ ...prev, confirmPassword: 'Пароли не совпадают' }))

        dispatch(updateUserThunk({
            id: user.id,
            req: {
                nickname: values.nickname,
                username: values.username,
                email: values.email,
                avatarUrl: values.avatarUrl,
                password: values.password
            }
        })).unwrap()
            .then(() => {
                notify('Профиль изменён', 'Ваш профиль успешно изменён', 'edit')
                if (user.username !== values.username) return navigate(`/user/${values.username}`)
                navigate(`/user/${user.username}`)
            })
            .catch((err: IApiError) => setErrors(prev => ({ ...prev, [err.field]: err.message })))
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/user/${user.username}`)
    }

    return (
        <>
            <Title>НАСТРОЙКИ ПРОФИЛЯ</Title>
            <form>
                <h3 className={styles.title}>ОСНОВНАЯ ИНФОРМАЦИЯ</h3>
                <div className={styles.formWrapper}>
                    <div className={styles.editAvatar}>
                        <Cover url={values.avatarUrl} width='150px' height='150px' borderRadius='12px' isInput={true} />
                        <div className={styles.content}>
                            <input ref={inputRef} hidden type="file" onChange={hundleAvatarChange} />
                            <Button color='default' padding='14px 20px 10px 20px' onClick={() => inputRef.current?.click()}>Загрузить новое фото</Button>
                            <p className={styles.sub}>JPG или PNG. Макс. размер 2MB</p>
                        </div>
                    </div>
                    <Input
                        label='Никнейм'
                        placeholder='Введите никнейм'
                        value={values.nickname}
                        onChange={handleNicknameChange}
                        type='text'
                        isGray={true}
                        error={errors.nickname}
                    />
                    <Input
                        label='Уникальный никнейм'
                        placeholder='Введите уникальный никнейм'
                        value={values.username}
                        onChange={handleUsernameChange}
                        type='text'
                        isGray={true}
                        error={errors.username}
                    />
                    <Input
                        label='Email'
                        placeholder='Введите email'
                        value={values.email}
                        onChange={handleEmailChange}
                        type='email'
                        isGray={true}
                        error={errors.email}
                    />
                </div>
                <h3 className={styles.title}>БЕЗОПАСНОСТЬ</h3>
                <div className={styles.formWrapper}>
                    <Input
                        label='Новый пароль'
                        placeholder='••••••••'
                        value={values.password}
                        onChange={handlePasswordChange}
                        type='password'
                        eyeIcon={true}
                        isGray={true}
                        error={errors.password}
                    />
                    <Input
                        label='Подтвердите пароль'
                        placeholder='••••••••'
                        value={values.confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        type='password'
                        eyeIcon={true}
                        isGray={true}
                        error={errors.confirmPassword}
                    />
                </div>
                <div className={styles.bottom}>
                    <Button color='accent' padding='16px 24px 12px 24px' onClick={hundleSubmit}>Сохранить изменения</Button>
                    <Button color='default' padding='16px 24px 12px 24px' onClick={hundleCancel}>Отмена</Button>
                </div>
            </form>
        </>
    )
}
