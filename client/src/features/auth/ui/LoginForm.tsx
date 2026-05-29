import { useState, type ChangeEvent, type MouseEvent } from "react"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { clearError, loginThunk } from "../model/slice"
import { selectAuthError } from "../model/selectors"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {

    const dispatch = useAppDispatch()
    const error = useAppSelector(selectAuthError)
    const { notify } = useNotification()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

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
        if (isLoading) return false
        setIsLoading(true)
        dispatch(loginThunk({
            email: values.email,
            password: values.password,
        })).unwrap()
            .then(() => {
                setIsLoading(false)
                notify('Вы вошли в аккаунт', 'Вы успешно вошли в свой аккаунт', 'success')
                navigate('/')
            })
            .catch(() => setIsLoading(false))
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
                icon={<i className="ph ph-envelope-simple"></i>}
            />
            <Input
                type="password"
                label="Пароль"
                placeholder="••••••••"
                value={values.password}
                onChange={handlePasswordChange}
                error={error}
                eyeIcon={true}
                icon={<i className="ph ph-password"></i>}
            />
            {/* <Link to='/forgot-password' className={styles.forgot}>Забыли пароль?</Link> */}
            <Button color="accent" padding="20px 16px 16px 16px" isLoading={isLoading} onClick={handleSubmit}>Войти</Button>
        </>
    )
}
