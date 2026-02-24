import { Button, Input, Title } from '@/shared/ui'
import styles from './EditProfileForm.module.scss'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { IUser } from '@/entities/user'
import { updateAvatarApi } from '../api/updateUserApi'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { clearUpdateError, initUpdateSlice, updateUserThunk } from '../model/slice'
import { selectUserUpdateError, selectUserUpdateStatus } from '../model/selectors'

interface EditProfileFormProps {
    user: IUser
}

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {

    const dispatch = useAppDispatch()
    const error = useAppSelector(selectUserUpdateError)
    const status = useAppSelector(selectUserUpdateStatus)
    const { notify } = useNotification() 
    const navigate = useNavigate()

    if (status === 'success') {
        notify('Профиль изменён', 'Ваш профиль успешно изменён', 'edit')
        navigate(`/user/${user.id}`)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    const [nickname, setNickname] = useState<string>(`${user.nickname}`)
    const [avatarUrl, setAvatarUrl] = useState<string>(`${user.avatarUrl}`)
    const [email, setEmail] = useState<string>(`${user.email}`)
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [nicknameError, setErrorNickname] = useState<string | null>(null)
    const [errorPassword, setErrorPassword] = useState<string | null>(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string | null>(null)

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value)
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            dispatch(clearUpdateError())
        }
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const hundleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const { data } = await updateAvatarApi(file)
        setAvatarUrl(data.url)
    }

    const hundleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        if (nickname.length < 4) {
            setErrorNickname('Никнейм должен содержать минимум 4 символа')
            return false
        }

        if (password.length > 0 && password.length < 6) {
            setErrorPassword('Пароль должен содержать минимум 6 символа')
            return false
        }

        if (password !== confirmPassword) {
            setErrorConfirmPassword('Пароли не совпадают')
            return false
        }

        dispatch(updateUserThunk({
            id: user.id,
            req: {
                nickname: nickname,
                email: email,
                avatarUrl: avatarUrl,
                password: password
            }
        }))
    }

    const hundleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/user/${user.id}`)
    }

    return (
        <>
            <Title>НАСТРОЙКИ ПРОФИЛЯ</Title>
            <form>
                <h3 className={styles.title}>ОСНОВНАЯ ИНФОРМАЦИЯ</h3>
                <div className={styles.formWrapper}>
                    <div className={styles.editAvatar}>
                        <img src={`${avatarUrl}`} alt="" className={styles.avatar} />
                        <div className={styles.content}>
                            <input ref={inputRef} hidden type="file" onChange={hundleAvatarChange} />
                            <Button color='default' padding='14px 20px 10px 20px' onClick={() => inputRef.current?.click()}>Загрузить новое фото</Button>
                            <p className={styles.sub}>JPG или PNG. Макс. размер 2MB</p>
                        </div>
                    </div>
                    <Input
                        label='Никнейм'
                        placeholder='Введите никнейм'
                        value={nickname}
                        onChange={handleNicknameChange}
                        type='text'
                        isGray={true}
                        error={nicknameError}
                    />
                    <Input
                        label='Email'
                        placeholder='Введите email'
                        value={email}
                        onChange={handleEmailChange}
                        type='email'
                        isGray={true}
                        error={error}
                    />
                </div>
                <h3 className={styles.title}>БЕЗОПАСНОСТЬ</h3>
                <div className={styles.formWrapper}>
                    <Input
                        label='Новый пароль'
                        placeholder='••••••••'
                        value={password}
                        onChange={handlePasswordChange}
                        type='password'
                        eyeIcon={true}
                        isGray={true}
                        error={errorPassword}
                    />
                    <Input
                        label='Подтвердите пароль'
                        placeholder='••••••••'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        type='password'
                        eyeIcon={true}
                        isGray={true}
                        error={errorConfirmPassword}
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
