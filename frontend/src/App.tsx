


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

import './App.css'




export default function App(){


    return (

        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                   <Route path="/"  element={<Home />}  />
                   <Route path="/profile" element={<Profile />} />
                   <Route path="/create" element={<CreatePost />} />
                </Route>
                <Route path="/signin" element={<Auth />} />
            </Routes>
        </BrowserRouter>

    );

}