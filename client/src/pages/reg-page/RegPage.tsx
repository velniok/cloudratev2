import { useLocation } from "react-router-dom"
import { AuthForm } from "@/widgets/auth-forms"
import { useEffect } from "react"

export const RegPage = () => {

    const pathname = useLocation().pathname.slice(1)
    const test = useLocation()

    useEffect(() => {
        console.log(test.key)
    }, [])

    return (
        <>
            <AuthForm pathname={pathname} />
        </>
    )
}