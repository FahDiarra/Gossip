
import { Link } from "react-router-dom";

//context
import {useTheme} from "@/context/ThemeContext";
//hooks
import useIsMobile from "@/hooks/useIsMobile";
import useToggleDropdown from "@/hooks/useToggleDown";
import BtnWithTooltip from "@/components/BtnWithTooltip.tsx";
//config
import appConfig from "@/config/appConfig";

import {
    Search,
    Bell,
    MessageCircle,
    SlidersHorizontal,
    Globe,
  MapPin,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  ChevronDown
} from "lucide-react";

import "@/styles/menu/Navbar.css";
import { useState } from "react";

export default function Navbar() {

    const {
        open:configOpen,
        toggle:configToggle,
        menuRef:configMenuRef,
        btnRef:configBtnRef
    } = useToggleDropdown();

const { theme, setTheme } = useTheme();

const [openLanguage, setOpenLanguage] = useState(false);
const isMobile = useIsMobile(900);

    return (
        <header className="gp-navbar">
            <div className="gp-navbar-left">
               

                <Link to="/" className="gp-logo">
                    <div className="gp-logo-icon">
                        <img src={appConfig.logo} alt="logo" />
                    </div>
                    <span>
                        {appConfig.title}
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
                
<div className="gp-dropdown-wrapper" ref={configMenuRef}>
  
 <BtnWithTooltip
    ref={configBtnRef}
    onClick={configToggle}
    className={`gp-nav-btn ${configOpen ? "active" : ""}`}
    tooltip="Customize" >
     <SlidersHorizontal size={22} />
 </BtnWithTooltip>


  {configOpen && (
    <div className="gp-dropdown">

      {/* Theme */}
      <div className="gp-dropdown-item">
        <div className="gp-dropdown-header">
          <div className="gp-dropdown-title">
            <Sun size={17} />
            <span>Theme</span>
          </div>
        </div>

        <div className="gp-theme-switch">
          <button
            className={`gp-theme-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <Sun size={16} />
          </button>

          <button
            className={`gp-theme-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <Moon size={16} />
          </button>

          <button
            className={`gp-theme-btn ${theme === "default" ? "active" : ""}`}
            onClick={() => setTheme("default")}
          >
            <Monitor size={16} />
          </button>
        </div>
      </div>

      {/* Language */}

      <div className="gp-dropdown-item">
  <div className="gp-lang-wrapper">

    <button
      className="gp-dropdown-row"
      onClick={() => setOpenLanguage(!openLanguage)}
    >
      <div className="gp-dropdown-title">
        <Globe size={17} />
        <span>Language</span>
      </div>

      <div className="gp-dropdown-value">
        <span>Default</span>
        <ChevronDown
          size={16}
          className={openLanguage ? "rotate" : ""}
        />
      </div>
    </button>

    {openLanguage && (
      <div className="gp-lang-dropdown">
        <button className="active">
          <Monitor size={15} />
          <span>Default (Browser)</span>
        </button>

        <button>
          🇺🇸
          <span>English</span>
        </button>

        <button>
          🇫🇷
          <span>Français</span>
        </button>

        <button>
          🇪🇸
          <span>Español</span>
        </button>
      </div>
    )}
  </div>
</div>

      {/* Location */}

      <div className="gp-dropdown-item">
        <button className="gp-dropdown-row">
          <div className="gp-dropdown-title">
            <MapPin size={17} />
            <span>Location</span>
          </div>

          <div className="gp-dropdown-value">
            <span>Charlotte, NC</span>
            <ChevronRight size={16} />
          </div>
        </button>
      </div>

    </div>
  )}
</div>




            </div>

        </header>
    );

}