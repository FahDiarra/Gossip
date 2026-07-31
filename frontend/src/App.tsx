


import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import MainLayout from "@/layout/MainLayout";

//pages
import Home from "@/pages/Home.tsx";

import './App.css'


export default function App(){


    return (

        <BrowserRouter>

            <Routes>


                <Route element={<MainLayout />}>
                   <Route
                        path="/"
                        element={<Home />}
                    />
                  
                </Route>


            </Routes>

        </BrowserRouter>

    );

}