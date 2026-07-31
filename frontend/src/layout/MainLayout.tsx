

import { Outlet } from "react-router-dom";


//components
import Navbar from "@/components/menu/Navbar";
import Sidebar from "@/components/menu/Sidebar";
import MobileSidebar from "@/components/menu/MobileSidebar";

//context
import { useSidebar } from "@/context/SidebarContext";

//style
import "@/styles/menu/Layout.css";


export default function MainLayout(){

    const { open } = useSidebar();

    return (

        <>
         <div className="main-layout">
             <Navbar />
             
             <div className="main-layout-wrapper">
                <Sidebar />     
                 <main  className="main-layout-container">
                    <Outlet />
                 </main>
              </div>
              <MobileSidebar/>
        </div>
        </>

    );

}