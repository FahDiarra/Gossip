

import {useEffect} from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import SessionExpiredModal from "@/components/auth/SessionExpiredModal"

import MainLayout from "@/layout/MainLayout";
//Lang
import { useTranslation } from "react-i18next";
//pages
import Home from "@/pages/Home.tsx";
import {Auth} from "@/pages/Auth.tsx";
import {Profile} from "@/pages/Profile.tsx";
import EditProfile from "@/pages/editProfile"
import CreatePost from "@/pages/CreatePost";
//Routes
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import './App.css'
import {useAuth} from "@/context/AuthContext.tsx";





export default function App(){
    const {
        sessionExpired,
    } = useAuth();

    const { i18n } = useTranslation();
    useEffect(():void => {
        document.documentElement.lang = i18n.resolvedLanguage || "en";
    }, [i18n.resolvedLanguage]);


    return (


        <BrowserRouter>
            {sessionExpired && ( <SessionExpiredModal />)}
            <Routes>

                {/* Public routes accessible to everyone */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>


                {/* Protected routes accessible only to authenticated users */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="Edit-Profile" element={<EditProfile/>} />
                        <Route path="/create" element={<CreatePost />} />
                    </Route>
                </Route>

                {/* Authentication routes accessible only to unauthenticated users */}
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/signin" element={<Auth />} />
                </Route>

            </Routes>
        </BrowserRouter>

 );

}