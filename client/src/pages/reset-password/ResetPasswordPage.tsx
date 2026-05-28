import { AuthForm } from "@/widgets/auth-forms"
import { useLocation } from "react-router-dom"

export const ResetPasswordPage = () => {

    const pathname = useLocation().pathname.slice(1)

    return (
        <>
            <AuthForm pathname={pathname} />
        </>
    )
}
