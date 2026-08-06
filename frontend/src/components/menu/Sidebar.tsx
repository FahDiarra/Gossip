
import { Link, useLocation,useNavigate } from "react-router-dom";

//context
import { useSidebar } from "@/context/SidebarContext";
//config
import appConfig from "@/config/appConfig";
//lang
import { useTranslation } from "react-i18next";
import {
    Home,
    Heart,
    Compass,
    Clapperboard,
    Users,
    Star,
    Bookmark,
    PlusCircle,
    User,
    ChevronLeft,
    ChevronRight,
    Radio
} from "lucide-react";
import "@/styles/menu/Sidebar.css";

import exProfile from "@/images/profile.jpg"

export default function Sidebar() {

    const location = useLocation();
    const {t}=useTranslation();
     const navigate = useNavigate();
    

const {
    open,
    toggleSidebar
}=useSidebar();

    const menus = [

        {icon:<Home size={22}/>,label: t("sidebar.home"),path:"/"},
        {icon:<Compass size={22}/>,label:t("sidebar.explore"),path:"/explore"},
        {icon:<Clapperboard size={22}/>,label:t("sidebar.vibes"),path:"/reels"},
        {icon:<Radio size={22}/>,label:t("sidebar.live"),path:"/live"},
        {icon:<Users size={22}/>,label:t("sidebar.friends"),path:"/friends"},
        {icon:<Star size={22}/>,label: t("sidebar.following"),path:"/following"},
        {icon:<Bookmark size={22}/>,label: t("sidebar.saved"),path:"/saved"},
        {icon:<Heart size={22}/>,label: t("sidebar.liked"), path:"/settings"}

    ];

    return (

    <aside className={`gp-sidebar ${open ? "open" : "close"}`}>   
        <div className="gp-sidebar-header-content">
            <div className="gp-sidebar-header">
                <h2>{t("sidebar.menu")}</h2>
                <button onClick={toggleSidebar}  >
                    <ChevronLeft className={open ? "" : "rotate"} />
                </button>
            </div>

            <button className="gp-create-post"
            onClick={()=>navigate("create")}
            >
                <PlusCircle size={22}/>
                {open && t("sidebar.post_label")}
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

        <div className="gp-sidebar-footer-profile">
        <Link to="/profile" className="gp-sidebar-footer-profile-link">

            <div className="gp-sidebar-footer-profile-info">
                <div  className="gp-sidebar-footer-profile-photo">
                     <img src={exProfile} alt={t("sidebar.profile")} />
                 </div>
                {open && (
                <>
                <div className="gp-sidebar-footer-profile-text">
                    <span className="gp-sidebar-footer-profile-title">
                        {t("sidebar.profile")} 
                    </span>
                    <small>
                         {t("sidebar.profile_label")} 
                    </small>
                </div>
                 </> ) }
             </div>

            {open && (
                <ChevronRight className="gp-sidebar-footer-profile-arrow" size={20} />
            )}
        </Link>
    </div>

     <div className="gp-sidebar-footer-profile">
        <Link to="/signin" className="gp-sidebar-footer-profile-link">
            <div className="gp-sidebar-footer-profile-info">
                <div className="gp-sidebar-footer-profile-icon">
                    <User size={20} />
                </div>
                {open && (
                <>
                <div className="gp-sidebar-footer-profile-text">
                    <span className="gp-sidebar-footer-profile-title">
                       {t("sidebar.join")} {appConfig.title}
                    </span>
                    <small>
                           {t("sidebar.join_label")} 
                    </small>
                </div>
                 </> ) }
             </div>

            {open && (
                <ChevronRight className="gp-sidebar-footer-profile-arrow" size={20} />
            )}
        </Link>
    </div>

    </aside>

    );

}