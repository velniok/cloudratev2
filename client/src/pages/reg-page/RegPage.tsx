import { useLocation } from "react-router-dom"
import { AuthForm } from "@/widgets/auth-forms"

export const RegPage = () => {

    const pathname = useLocation().pathname.slice(1)

    return (
        <>
            <AuthForm pathname={pathname} />
        </>
    )
}