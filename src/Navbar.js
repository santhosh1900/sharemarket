import React from 'react';
import "./Navbar.css";
import cookies from "universal-cookie";
import { LogoutUser } from "./store/UserAction";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
    const history    = useHistory();
    const Cookie     = new cookies;
    const dispatch   = useDispatch();
    const User   = useSelector(state => state.user.UserData);

    const Logoutuser = () => {
        localStorage.clear();
        Cookie.remove("token");
        dispatch(LogoutUser());
        history.push("/login"); 
    }

    const renderList = ()=>{
        if(User){
            return [
                <li key="1"><a>  {User.Username}  </a></li>,
                <li key="2"><Link to="/userstocks"> Your Stock Details </Link></li>,
                <li key="3"><a onClick = {Logoutuser}> Logout </a></li>
            ]
        }else{
            return []
        }
    }

    return (
        <div className="Navbar">
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo"> Quikie <span className="small"> Apps </span>  </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        { renderList() }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
