import React, { useContext, useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/logo.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import "../Style/navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'



const Navbar = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    const handleLogout = () => {
        cookies.remove('token', { path: '/' });
        cookies.remove('userId', { path: '/' });
        navigate("/login");
    }
    const token=cookies.get('token', { path: '/' });
    const userId=cookies.get('userId', { path: '/' });
    const closeMobileMenu = () => setClick(false);
    return (
        <div className="header">
            <div className="logo-nav">
                <div className="logo-container">
                    <Link to="/home">
                        <img src="https://logodix.com/logo/818943.png" alt="" className="logo" />
                    </Link>
                </div>
                <ul className={click ? "nav-options active" : "nav-options"}>
                    <li className="option mobile-option" onClick={closeMobileMenu}>

                        <button onClick={handleLogout}>Logout</button>

                    </li>
                </ul>
            </div>
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <CloseMenu className="menu-icon" />
                ) : (
                    <MenuIcon className="menu-icon" />
                )}
            </div>
            <ul className="signin-up">
                <li onClick={closeMobileMenu}>
                    {/* <Link to="" > */}
                        <button className="signup-btn" onClick={handleLogout}>{token ? "Logout" : "Login"}</button>
                    {/* </Link> */}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
