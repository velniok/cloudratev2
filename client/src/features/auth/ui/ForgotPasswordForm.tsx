import { Button, Input } from '@/shared/ui'
import { ChangeEvent, useState } from 'react'
import { forgotPasswordApi } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/shared/lib'

export const ForgotPasswordForm = () => {

    const navigate = useNavigate()
    const { notify } = useNotification()
    const [email, setEmail] = useState<string>('')

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        forgotPasswordApi({ email: email })
            .then(() => {
                notify('Ссылка отправлена', 'Ссылка на восстановление пароля была отправлена', 'success')
            })
    }

    return (
        <>
            <Input
                type="email"
                label="EMAIL адрес"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                // error={error}
                icon={<i className="ph ph-envelope-simple"></i>}
            />
            <Button color="accent" padding="20px 16px 16px 16px" onClick={handleSubmit}>Отправить ссылку</Button>
            <Button color="default" padding="20px 16px 16px 16px" onClick={() => navigate('/login')}>Отмена</Button>
        </>
    )
}
