import { useState, type ChangeEvent, type MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { clearError, registerThunk } from "../model/slice"
import { selectAuthError, selectAuthStatus } from "../model/selectors"
import { useNavigate } from "react-router-dom"

export const RegForm = () => {

    const dispatch = useAppDispatch()
    const error = useAppSelector(selectAuthError)
    const status = useAppSelector(selectAuthStatus)

    const navigate = useNavigate()

    if (status === 'success') {
        navigate('/')
    }

    const [nickname, setNickname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [errorNickname, setErrorNickname] = useState<string | null>(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string | null>(null)
    const [errorPassword, setErrorPassword] = useState<string | null>(null)

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        hiddenError()
        setNickname(e.target.value)
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        hiddenError()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        hiddenError()
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        hiddenError()
        setConfirmPassword(e.target.value)
    }

    const hiddenError = () => {
        if (errorNickname) {
            setErrorNickname(null)
        }
        if (errorConfirmPassword) {
            setErrorConfirmPassword(null)
        }
        if (errorPassword) {
            setErrorPassword(null)
        }
        if (error) {
            dispatch(clearError())
        }
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (nickname.length <= 4) {
            setErrorNickname('Никнейм должен содержать минимум 4 символа')
            return false
        }

        if (password.length < 6) {
            setErrorPassword('Пароль должен содержать минимум 6 символа')
            return false
        }

        if (password !== confirmPassword) {
            setErrorConfirmPassword('Пароли не совпадают')
            return false
        }

        dispatch(registerThunk({ nickname, email, password }))
    }

    return (
        <>
            <Input
                type="text"
                label="Никнейм"
                placeholder="Введите никнейм"
                value={nickname}
                onChange={handleNicknameChange}
                error={errorNickname}
            />
            <Input
                type="email"
                label="EMAIL адрес"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                error={error}
            />
            <Input
                type="password"
                label="Пароль"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                error={errorPassword}
                eyeIcon={true}
            />
            <Input
                type="password"
                label="Подтвердите пароль"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={errorConfirmPassword}
                eyeIcon={true}
            />
            <Button color="accent" padding="20px 16px 16px 16px" onClick={handleSubmit}>Зарегистрироваться</Button>
        </>
    )
}
