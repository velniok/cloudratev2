import { useState, type ChangeEvent, type MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { clearError, loginThunk } from "../model/slice"
import { selectAuthError, selectAuthStatus } from "../model/selectors"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {

    const dispatch = useAppDispatch()
    const error = useAppSelector(selectAuthError)
    const status = useAppSelector(selectAuthStatus)

    const navigate = useNavigate()

    if (status === 'success') {
        navigate('/')
    }

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(clearError())
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(clearError())
        setPassword(e.target.value)
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(loginThunk({ email, password }))
    }

    return (
        <>
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
                error={error}
                eyeIcon={true}
            />
            <Button color="accent" padding="20px 16px 16px 16px" onClick={handleSubmit}>Войти</Button>
        </>
    )
}
