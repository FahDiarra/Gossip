
import { Link } from "react-router-dom";
import { useState } from "react";

//context
import {useTheme} from "@/context/ThemeContext";
//hooks
import useIsMobile from "@/hooks/useIsMobile";
import useToggleDropdown from "@/hooks/useToggleDown";
import BtnWithTooltip from "@/components/BtnWithTooltip.tsx";
//config
import appConfig from "@/config/appConfig";
//lang
import i18n from "@/i18n/langConfig";
//lang
import { useTranslation } from "react-i18next";

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


export default function Navbar() {

    const {
        open:configOpen,
        toggle:configToggle,
        menuRef:configMenuRef,
        btnRef:configBtnRef
    } = useToggleDropdown();

     const {
        open:langOpen,
        toggle:langToggle,
        menuRef:langMenuRef,
        btnRef:langBtnRef
    } = useToggleDropdown();

const { theme, setTheme } = useTheme();
 const {t}=useTranslation();

const isMobile = useIsMobile(900);

const changeLanguage = (lang:string)=>{
  i18n.changeLanguage(lang);
  localStorage.setItem(
    "language",
    lang
  );

 langToggle();

};

const languages = {
  en: t("navbar.english"),
  fr: t("navbar.french"),
  es: t("navbar.spanish"),
};
const langType = () => i18n.resolvedLanguage;

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
                    <input   placeholder={t("navbar.placeholder")} />
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
    tooltip={t("navbar.customize")} >
     <SlidersHorizontal size={22} />
 </BtnWithTooltip>


  {configOpen && (
    <div className="gp-dropdown">

      {/* Theme */}
      <div className="gp-dropdown-item">
        <div className="gp-dropdown-header">
          <div className="gp-dropdown-title">
            <Sun size={17} />
            <span>{t("navbar.theme")}</span>
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
            onClick={() => setTheme("default")}  >
            <Monitor size={16} />
          </button>
        </div>
      </div>

      {/* Language */}

        <div className="gp-dropdown-item">
          <div className="gp-lang-wrapper">

            <button
              className="gp-dropdown-row"
              onClick={langToggle}  ref={langBtnRef}   >
              <div className="gp-dropdown-title">
                <Globe size={17} />
                <span>
                  {languages[i18n.resolvedLanguage as keyof typeof languages]} 
                </span>
              </div>

              <div className="gp-dropdown-value">
                <span>Select</span>
                <ChevronDown
                  size={16}  className={langOpen ? "rotate" : ""}  />
              </div>
            </button>

            {langOpen && (
              <div className="gp-lang-dropdown" ref={langMenuRef}>
                
                <button onClick={()=>changeLanguage("en")} 
                className={`btnChangeLang ${langType() === "en" ? "active" : "" }`} >
                  🇺🇸
                  <span>{t("navbar.english")}</span>
                </button>

                <button onClick={()=>changeLanguage("fr")}
                  className={`btnChangeLang ${langType() === "fr" ? "active" : "" }`}>
                  🇫🇷
                  <span>{t("navbar.french")}</span>
                </button>

                <button onClick={()=>changeLanguage("es")}
                  className={`btnChangeLang ${langType() === "es" ? "active" : "" }`}>
                  🇪🇸
                  <span>{t("navbar.spanish")}</span>
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
            <span>{t("navbar.location")}</span>
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