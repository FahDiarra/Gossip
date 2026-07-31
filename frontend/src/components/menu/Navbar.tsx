
import { Link } from "react-router-dom";

//context
import  {useSidebar} from "@/context/SidebarContext";
//hooks
import useIsMobile from "@/hooks/useIsMobile";

import {
    Search,
    Bell,
    MessageCircle,
    Menu,
    ChevronDown
} from "lucide-react";

import "@/styles/menu//Navbar.css";

export default function Navbar() {

const {
    openMobile,
    toggleSidebar
     } = useSidebar();

const isMobile = useIsMobile(900);

    return (
        <header className="gp-navbar">

            <div className="gp-navbar-left">

                <button 
                onClick={()=>{
         if(isMobile)
              openMobile();
          else
            toggleSidebar();
          }}
                
                className="gp-mobile-menu">
                    <Menu size={22}/>
                </button>

                <Link to="/" className="gp-logo">

                    <div className="gp-logo-icon">
                        G
                    </div>

                    <span>
                        Gossip.
                    </span>

                </Link>

            </div>

            <div className="gp-navbar-center">

                <div className="gp-search">

                    <Search size={18}/>

                    <input
                        placeholder="Search users, videos..."
                    />

                </div>

            </div>

            <div className="gp-navbar-right">

                <button className="gp-nav-btn">

                    <MessageCircle size={22}/>

                    <span className="gp-badge">
                        3
                    </span>

                </button>

                <button className="gp-nav-btn">

                    <Bell size={22}/>

                    <span className="gp-badge">
                        9
                    </span>

                </button>

                <button className="gp-profile-btn">

                    <img
                        src="https://i.pravatar.cc/150?img=8"
                        alt=""
                    />

                    <ChevronDown size={16}/>

                </button>

            </div>

        </header>
    );

}