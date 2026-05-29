import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react"
import { useAppDispatch, useNotification } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { registerThunk } from "../model/slice"
import { useNavigate } from "react-router-dom"
import { IApiError } from "@/shared/types"
import { sendVerifyCodeApi } from "../api/authApi"
import axios from "axios"
import styles from './Auth.module.scss'

export const RegForm = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [verifyPage, setVerifyPage] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(60)

    useEffect(() => {
        if (!verifyPage) return setSeconds(60)
        if (seconds <= 0) return

        const timerId = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
        
        return () => clearInterval(timerId)
    }, [seconds, verifyPage])

    const initialValues = {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        verifyCode: '',
    }
    const [values, setValues] = useState(initialValues)

    const initialErrors = {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        verifyCode: '',
    }
    const [errors, setErrors] = useState(initialErrors)

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, nickname: '' }))
        setValues(prev => ({ ...prev, nickname: e.target.value }))
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

    const handleVerifyCode = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({ ...prev, verifyCode: '' }))
        setValues(prev => ({ ...prev, verifyCode: e.target.value }))
    }

    const handleSendVerifyCode = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (values.nickname.length <= 4) return setErrors(prev => ({ ...prev, nickname: 'Никнейм должен содержать минимум 4 символа' }))
        if (!/^[a-zA-Z0-9_#@-]+$/.test(values.nickname)) return setErrors(prev => ({ ...prev, nickname: 'Уник. никнейм может содержать только латинские буквы, цифры, _, @, - и #' }))
        if (!values.email) return setErrors(prev => ({ ...prev, email: 'Email не может быть пустым' }))
        if (!/\S+@\S+\.\S+/.test(values.email)) return setErrors(prev => ({ ...prev, email: 'Неверный формат email' }))
        if (values.password.length < 6) return setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум 6 символов' }))
        if (values.password !== values.confirmPassword) return setErrors(prev => ({ ...prev, confirmPassword: 'Пароли должны совпадать' }))
        
        await sendVerifyCodeApi({
            nickname: values.nickname,
            email: values.email,
            password: values.password,
        })
            .then(() => setVerifyPage(true))
            .catch((err: IApiError) => {
                if (axios.isAxiosError(err) && err.response) {
                    const apiError: IApiError = err.response.data
                    setErrors(prev => ({ ...prev, [apiError.field ?? '']: apiError.message }))
                }
            })
    }

    const hundleRegister = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (isLoading) return false

        // if (values.verifyCode.length < 6) return setErrors(prev => ({ ...prev, verifyCode: 'Код должен содержать минимум 6 символа' }))
        if (values.nickname.length <= 4) return setErrors(prev => ({ ...prev, nickname: 'Никнейм должен содержать минимум 4 символа' }))
        if (!/^[a-zA-Z0-9_#@-]+$/.test(values.nickname)) return setErrors(prev => ({ ...prev, nickname: 'Уник. никнейм может содержать только латинские буквы, цифры, _, @, - и #' }))
        if (!values.email) return setErrors(prev => ({ ...prev, email: 'Email не может быть пустым' }))
        if (!/\S+@\S+\.\S+/.test(values.email)) return setErrors(prev => ({ ...prev, email: 'Неверный формат email' }))
        if (values.password.length < 6) return setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум 6 символов' }))
        if (values.password !== values.confirmPassword) return setErrors(prev => ({ ...prev, confirmPassword: 'Пароли должны совпадать' }))

        setIsLoading(true)

        dispatch(registerThunk({
            nickname: values.nickname,
            email: values.email,
            password: values.password,
            // verifyCode: values.verifyCode,
        })).unwrap()
            .then(() => {
                setIsLoading(false)
                notify('Аккаунт зарегистрирован', 'Вы успешно зарегистрировали аккаунт', 'success')
                navigate('/')
            })
            .catch((err: IApiError) => {
                setErrors(prev => ({ ...prev, [err.field ?? '']: err.message }))
                setIsLoading(false)
            })
    }

    return (
        <>
        {
            verifyPage ?
            <>
                <p className={styles.text}>Код подтверждения отправлен на почту <span>{values.email}</span></p>
                <Input
                    type="text"
                    label="Код активации"
                    placeholder="Введите код активации"
                    value={values.verifyCode}
                    onChange={handleVerifyCode}
                    error={errors.verifyCode}
                />
                <div className={styles.retry}>
                    {
                        seconds === 0 ?
                        
                        <Button className={styles.retry__btn} color="default" padding="10px 8px 8px 8px" onClick={(e) => {handleSendVerifyCode(e); setSeconds(60)}}>Получить новый код</Button>
                        :
                        <p className={styles.retry__text}>Получить новый код через: <span>{seconds} сек.</span></p>
                    }
                </div>
                <Button color="accent" padding="20px 16px 16px 16px" onClick={hundleRegister}>Зарегистрироваться</Button>
                <Button color="default" padding="16px 12px 12px 12px" onClick={() => setVerifyPage(false)}>Отмена</Button>
            </>
            :
            <>
                <Input
                    type="text"
                    label="Никнейм"
                    placeholder="Введите никнейм"
                    value={values.nickname}
                    onChange={handleNicknameChange}
                    error={errors.nickname}
                    icon={<i className="ph ph-user"></i>}
                />
                <Input
                    type="email"
                    label="EMAIL адрес"
                    placeholder="name@example.com"
                    value={values.email}
                    onChange={handleEmailChange}
                    error={errors.email}
                    icon={<i className="ph ph-envelope-simple"></i>}
                />
                <Input
                    type="password"
                    label="Пароль"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handlePasswordChange}
                    error={errors.password}
                    eyeIcon={true}
                    icon={<i className="ph ph-password"></i>}
                />
                <Input
                    type="password"
                    label="Подтвердите пароль"
                    placeholder="••••••••"
                    value={values.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={errors.confirmPassword}
                    eyeIcon={true}
                    icon={<i className="ph ph-password"></i>}
                />
                <Button color="accent" padding="20px 16px 16px 16px" isLoading={isLoading} onClick={hundleRegister}>Зарегистрироваться</Button>
            </>
        }
        </>
    )
}