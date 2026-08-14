


import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import MainLayout from "@/layout/MainLayout";

//pages
import Home from "@/pages/Home.tsx";
import Auth from "@/pages/Auth.tsx";
import Profile from "@/pages/Profile.tsx";
import CreatePost from "@/pages/CreatePost";
//Routes
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import './App.css'




export default function App(){


    return (

        <BrowserRouter>
            <Routes>

                {/* Public routes accessible to everyone */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>


                {/* Protected routes accessible only to authenticated users */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/profile" element={<Profile />} />
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