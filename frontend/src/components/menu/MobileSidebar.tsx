import {
    Home,
    Search,
    Plus,
    Heart,
    User
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "@/styles/menu/MobileSidebar.css";

export default function MobileSidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menu = [
        {
            icon: <Home size={23} />,
            label: "Home",
            path: "/"
        },
        {
            icon: <Search size={23} />,
            label: "Explore",
            path: "/explore"
        }
    ];


    const rightMenu = [
        {
            icon: <Heart size={23} />,
            label: "Likes",
            path: "/notifications"
        },
        {
            icon: <User size={23} />,
            label: "Profile",
            path: "/profile"
        }
    ];

    return (
        <nav className="gp-mobile-bottom">

            {/* LEFT */}
            <div className="gp-mobile-links-container">

                {menu.map((item) => {

                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            type="button"
                            className={`gp-mobile-link ${
                                isActive ? "active" : ""
                            }`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}

                            <span>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

            </div>


            {/* CREATE */}
            <button
                type="button"
                className="gp-mobile-create"
                onClick={() => navigate("/create")}
            >
                <Plus size={30} strokeWidth={2.5} />
            </button>


            {/* RIGHT */}
            <div className="gp-mobile-links-container">
                {rightMenu.map((item) => {

                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            type="button"
                            className={`gp-mobile-link ${
                                isActive ? "active" : ""
                            }`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}

                            <span>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

            </div>

        </nav>
    );
}