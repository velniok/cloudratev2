import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import "./styles/main.scss"

import { Sidebar } from "@/widgets/sidebar"
import { AdminSidebar } from "@/widgets/admin-sidebar"

import { HomePage } from "@/pages/home-page"
import { TrackPage } from "@/pages/track-page"
import { ArtistPage } from "@/pages/artist-page"
import { UserPage } from "@/pages/user-page"
import { EditProfilePage } from "@/pages/edit-profile-page"
import { RegPage } from "@/pages/reg-page"
import { LoginPage } from "@/pages/login-page"
import { AdminPanelPage } from "@/pages/admin-panel-page"
import { AdminArtistsPage } from "@/pages/admin-artists-page"

import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { Notification } from "@/shared/ui"

import { authThunk, clearError, selectAuthUser } from "@/features/auth"
import { AdminTracksPage } from "@/pages/admin-tracks-page"
import { AdminUsersPage } from "@/pages/admin-users-page"
import { SearchPage } from "@/pages/search-page"
import { Header } from "@/widgets/header"

function App() {

    const dispatch = useAppDispatch()
    const authUser = useAppSelector(selectAuthUser)
    const pathname = useLocation().pathname

    const [sidebar, setSidebar] = useState<boolean>(false)

    useEffect(() => {
        if (sidebar) return document.body.classList.add('no-scroll')
        document.body.classList.remove('no-scroll')
    }, [sidebar])

    useEffect(() => {
        if (localStorage.getItem('isAuth'))
        dispatch(authThunk())
    }, [])

    return (
        <div className="app-shell">
            <Header setSidebar={setSidebar} sidebar={sidebar} />
            {
                pathname.slice(0, 6) !== '/admin' || authUser?.role !== 'admin' ?  <Sidebar setSidebar={() => setSidebar(false)} sidebar={sidebar} /> : <AdminSidebar setSidebar={() => setSidebar(false)} sidebar={sidebar} />
            }
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />

                    <Route path="/track/:id" element={<TrackPage />} />
                    <Route path="/artist/:id" element={<ArtistPage />} />

                    <Route path="/user/:username" element={<UserPage />} />
                    <Route path="/user/:username/edit" element={<EditProfilePage />} />

                    <Route path="/registration" element={<RegPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/admin" element={<AdminPanelPage role={authUser?.role} />} />
                    <Route path="/admin/artists" element={<AdminArtistsPage role={authUser?.role} />} />
                    <Route path="/admin/tracks" element={<AdminTracksPage role={authUser?.role} />} />
                    <Route path="/admin/users" element={<AdminUsersPage role={authUser?.role} />} />
                </Routes>
            </main>
            <Notification />
        </div>
    )
}

export default App
