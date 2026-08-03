


import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import MainLayout from "@/layout/MainLayout";

//pages
import Home from "@/pages/Home.tsx";
import Signin from "@/pages/Signin.tsx";
import Profile from "@/pages/Profile.tsx";

import './App.css'




export default function App(){


    return (

        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                   <Route path="/"  element={<Home />}  />
                   <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </BrowserRouter>

    );

}