import { Route, Routes, useLocation } from "react-router-dom"
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
import { AdminPanelPage } from "@/pages/admin-panel-page"
import { AdminSidebar } from "@/widgets/admin-sidebar"

import { useAppDispatch } from "@/shared/lib"
import { authThunk } from "@/features/auth"
import { AdminArtistsPage } from "@/pages/admin-artists-page"

function App() {

    const dispatch = useAppDispatch()
    const pathname = useLocation().pathname

    useEffect(() => {
        if (window.localStorage.token) {
            dispatch(authThunk())
        }
    }, [])

    return (
        <div className="app-shell">
            {
                pathname.slice(0, 6) !== '/admin' ?  <Sidebar /> : <AdminSidebar />
            }
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/track" element={<TrackPage />} />
                    <Route path="/artist" element={<ArtistPage />} />

                    <Route path="/user/:userId" element={<UserPage />} />
                    <Route path="/user/:userId/edit" element={<EditProfilePage />} />

                    <Route path="/registration" element={<RegPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/admin" element={<AdminPanelPage />} />
                    <Route path="/admin/artists" element={<AdminArtistsPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
