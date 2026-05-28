import { Button, Input } from "@/shared/ui"
import { ChangeEvent, useState } from "react"
import { resetPasswordApi } from "../api/authApi"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useNotification } from "@/shared/lib"

export const ResetPasswordForm = () => {

    const navigate = useNavigate()
    const { notify } = useNotification()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setConfirmPassword(e.target.value)
    }

    const hanldeSumbit = () => {
        if (password.length < 6) return setError('Пароль должен содержать минимум 6 символов')
        if (password !== confirmPassword) return setError('Пароли должны совпадать')
        
        resetPasswordApi({ token: token, newPassword: password })
            .then(() => {
                notify('Вы изменили пароль', 'Вы успешно изменили пароль', 'success')
                navigate('/login')
            })
    }

    return (
        <>
            <Input
                type="password"
                label="Пароль"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                error={error}
                eyeIcon={true}
                icon={<i className="ph ph-password"></i>}
            />
            <Input
                type="password"
                label="Подтвердите пароль"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={error}
                eyeIcon={true}
                icon={<i className="ph ph-password"></i>}
            />
            <Button color="accent" padding="20px 16px 16px 16px" onClick={hanldeSumbit}>Сохранить новый пароль</Button>
        </>
    )
}
