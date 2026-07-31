

import {
    Home,
    Search,
    Plus,
    Heart,
    User
} from "lucide-react";

import {
    NavLink
} from "react-router-dom";

import "@/styles/menu//MobileSidebar.css";
export default function MobileSidebar(){


    const menu = [

        {
            icon:<Home size={24}/>,
            label:"Home",
            path:"/"
        },

        {
            icon:<Search size={24}/>,
            label:"Explore",
            path:"/explore"
        },

    ];



    return (

        <nav className="gp-mobile-bottom">
     
    
            <div className="gp-mobile-links">


                {
                    menu.map(item=>(

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({isActive})=>

                                isActive
                                ? "active"
                                : ""

                            }

                        >

                            {item.icon}

                            <span>
                                {item.label}
                            </span>


                        </NavLink>

                    ))
                }



            </div>



            <button
                className="gp-mobile-create"
            >

                <Plus size={32}/>

            </button>



            <div className="gp-mobile-links right">


                <NavLink
                    to="/notifications"
                >

                    <Heart size={24}/>

                    <span>
                        Likes
                    </span>

                </NavLink>


                <NavLink
                    to="/profile"
                >

                    <User size={24}/>

                    <span>
                        Profile
                    </span>

                </NavLink>


            </div>

   
        </nav>

    );

}