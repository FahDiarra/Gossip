
import { Link, useLocation } from "react-router-dom";

//context
import { useSidebar } from "@/context/SidebarContext";
import {
    Home,
    Flame,
    Compass,
    Clapperboard,
    PlaySquare,
    MessageCircle,
    Bell,
    Users,
    Star,
    Bookmark,
    PlusCircle,
    User,
    Settings,
    ChevronLeft,
} from "lucide-react";
import "@/styles/menu/Sidebar.css";


export default function Sidebar() {

    const location = useLocation();



const {
    open,
    toggleSidebar
}=useSidebar();

    const menus = [

        {icon:<Home size={22}/>,label:"Home",path:"/"},
        {icon:<Flame size={22}/>,label:"Trending",path:"/trending"},
        {icon:<Compass size={22}/>,label:"Explore",path:"/explore"},
        {icon:<Clapperboard size={22}/>,label:"Reels",path:"/reels"},
        {icon:<PlaySquare size={22}/>,label:"Videos",path:"/videos"},
        {icon:<MessageCircle size={22}/>,label:"Messages",path:"/messages"},
        {icon:<Bell size={22}/>,label:"Notifications",path:"/notifications"},
        {icon:<Users size={22}/>,label:"Friends",path:"/friends"},
        {icon:<Star size={22}/>,label:"Following",path:"/following"},
        {icon:<Bookmark size={22}/>,label:"Saved",path:"/saved"},
        {icon:<User size={22}/>,label:"Profile",path:"/profile"},
        {icon:<Settings size={22}/>,label:"Settings",path:"/settings"}

    ];

    return (

    <aside className={`gp-sidebar ${open ? "open" : "close"}`}>   
        <div className="gp-sidebar-header-content">
            <div className="gp-sidebar-header">
                <h2>Menu</h2>
                <button onClick={toggleSidebar}  >
                    <ChevronLeft className={open ? "" : "rotate"} />
                </button>
            </div>

            <button className="gp-create-post">
                <PlusCircle size={22}/>
                {open && "Create Post"}
            </button>
        </div>

        <nav className="gp-sidebar-nav">
            <div className="gp-sidebar-items">
                {
                    menus.map(menu=>(
                        <Link
                            key={menu.path}
                            to={menu.path}
                            className={`gp-sidebar-item ${
                                location.pathname===menu.path
                                    ? "active"
                                    : ""
                            }`}
                        >

                            {menu.icon}

                             {open &&
                                <span>
                                    {menu.label}
                                </span>
                              }

                        </Link>

                    ))

                }
         </div>
        </nav>

    </aside>

    );

}