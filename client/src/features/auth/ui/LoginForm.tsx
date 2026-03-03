import { useState, type ChangeEvent, type MouseEvent } from "react"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { clearError, loginThunk } from "../model/slice"
import { selectAuthError, selectAuthStatus } from "../model/selectors"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {

    const dispatch = useAppDispatch()
    const error = useAppSelector(selectAuthError)
    const status = useAppSelector(selectAuthStatus)
    const { notify } = useNotification()
    const navigate = useNavigate()

    if (status === 'success') {
        navigate('/')
    }

    const initialValues = {
        email: '',
        password: '',
    }
    const [values, setValues] = useState(initialValues)

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) dispatch(clearError())
        setValues(prev => ({ ...prev, email: e.target.value }))
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) dispatch(clearError())
        setValues(prev => ({ ...prev, password: e.target.value }))
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(loginThunk({
            email: values.email,
            password: values.password,
        })).unwrap()
            .then(() => notify('Вы вошли в аккаунт', 'Вы успешно вошли в свой аккаунт', 'success'))
    }

    return (
        <>
            <Input
                type="email"
                label="EMAIL адрес"
                placeholder="name@example.com"
                value={values.email}
                onChange={handleEmailChange}
                error={error}
            />
            <Input
                type="password"
                label="Пароль"
                placeholder="••••••••"
                value={values.password}
                onChange={handlePasswordChange}
                error={error}
                eyeIcon={true}
            />
            <Button color="accent" padding="20px 16px 16px 16px" onClick={handleSubmit}>Войти</Button>
        </>
    )
}
