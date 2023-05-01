import logo from "../../assets/logo.png"
import { NavLink, Link } from "react-router-dom"
import s from "./Nav.module.css"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"

export default function Nav({white}) {
  const [shrink, setShrink] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useAuth()

  const handleClick = () => {
      setShowMenu(!showMenu)
      console.log(showMenu)
  }

  const handleNavbg = () => {
    if (window.scrollY >=  80) {
      setShrink(true)  
    } else {
      setShrink(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavbg)
  }, [])

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };
  }, []);

  return (
    <nav className={white ? s.ctn2 : s.ctn} style={shrink ? {padding: "10px"}: {}}>
      <Link to="/" className={s.logo}>
        <img src={logo} alt="logo"/>
        {!shrink && <h2>EXODUS</h2>}
      </Link>

      <div id="google_translate_element" className="heroBtn small"></div>

      {!(white) &&
      <>
        <div className={s.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}} onClick={handleClick}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/plans">Pricing</NavLink>
        <NavLink to="/support">Support</NavLink>
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        {!user &&
        <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signUp">Sign-Up</NavLink>
        </>
        }
      </div>

        <div className={s.hamburger} onClick={handleClick}>
          <span 
          className={showMenu ? s.activeBar : s.bar}
          ></span>
          <span 
          className={showMenu ? s.activeBar : s.bar}
          ></span>
          <span 
          className={showMenu ? s.activeBar : s.bar}
          ></span>
      </div>
      </>
      }
    </nav>
  )
}
