import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"

import "./styles/main.scss"

import { Sidebar } from "@/widgets/sidebar"

import { HomePage } from "@/pages/home-page"
import { TrackPage } from "@/pages/track-page"
import { ArtistPage } from "@/pages/artist-page"
import { UserPage } from "@/pages/user-page"
import { EditProfilePage } from "@/pages/edit-profile-page"
import { RegPage } from "@/pages/reg-page"
import { LoginPage } from "@/pages/login-page"

import { useAppDispatch } from "@/shared/lib"
import { authThunk } from "@/features/auth"

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (window.localStorage.token) {
            dispatch(authThunk())
        }
    }, [])

    return (
        <div className="app-shell">
            <Sidebar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/track" element={<TrackPage />} />
                    <Route path="/artist" element={<ArtistPage />} />

                    <Route path="/user/:userId" element={<UserPage />} />
                    <Route path="/user/:userId/edit" element={<EditProfilePage />} />

                    <Route path="/registration" element={<RegPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
