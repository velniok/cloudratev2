import { useState, type ChangeEvent, type MouseEvent } from "react"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { registerThunk } from "../model/slice"
import { selectAuthStatus } from "../model/selectors"
import { useNavigate } from "react-router-dom"
import { IApiError } from "@/shared/types"

export const RegForm = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(selectAuthStatus)
    const { notify } = useNotification()
    const navigate = useNavigate()

    if (status === 'success') {
        navigate('/')
    }

    const initialValues = {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [values, setValues] = useState(initialValues)

    const initialErrors = {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (values.nickname.length <= 4) return setErrors(prev => ({ ...prev, nickname: 'Никнейм должен содержать минимум 4 символа' }))
        if (!values.email) return setErrors(prev => ({ ...prev, email: 'Email не может быть пустым' }))
        if (!/\S+@\S+\.\S+/.test(values.email)) return setErrors(prev => ({ ...prev, email: 'Неверный формат email' }))
        if (values.password.length < 6) return setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум 6 символов' }))
        if (values.password !== values.confirmPassword) return setErrors(prev => ({ ...prev, confirmPassword: 'Пароли должны совпадать' }))

        dispatch(registerThunk({
            nickname: values.nickname,
            email: values.email,
            password: values.password,
        })).unwrap()
            .then(() => notify('Аккаунт зарегистрирован', 'Вы успешно зарегистрировали аккаунт', 'success'))
            .catch((err: IApiError) => {
                setErrors(prev => ({ ...prev, [err.field]: err.message }))
            })
    }

    return (
        <>
            <Input
                type="text"
                label="Никнейм"
                placeholder="Введите никнейм"
                value={values.nickname}
                onChange={handleNicknameChange}
                error={errors.nickname}
            />
            <Input
                type="email"
                label="EMAIL адрес"
                placeholder="name@example.com"
                value={values.email}
                onChange={handleEmailChange}
                error={errors.email}
            />
            <Input
                type="password"
                label="Пароль"
                placeholder="••••••••"
                value={values.password}
                onChange={handlePasswordChange}
                error={errors.password}
                eyeIcon={true}
            />
            <Input
                type="password"
                label="Подтвердите пароль"
                placeholder="••••••••"
                value={values.confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={errors.confirmPassword}
                eyeIcon={true}
            />
            <Button color="accent" padding="20px 16px 16px 16px" onClick={handleSubmit}>Зарегистрироваться</Button>
        </>
    )
}
