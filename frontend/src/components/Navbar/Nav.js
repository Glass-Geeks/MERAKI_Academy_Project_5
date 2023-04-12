import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {

  setLogout,

} from "../store/auth/index";
import "./Nav.css"
const Nav = ({ links }) => {
  //Home and login 
  //contact
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });
  const handleClick = () => {
    localStorage.clear()
    dispatch(setLogout())
    navigate("/")
  }
  return (
    <nav className="navbar">
      <Link to={"/"} className="logo">Logo</Link>
      <ul className="nav-links">
        <li><Link to={"/"}>Home</Link></li>
        {state.auth.isLoggedIn&&<li><Link>Messages</Link></li>}
        {state.auth.isLoggedIn&&<li><Link>Friends</Link></li>}
        {state.auth.isLoggedIn ? <li className="dropdown"><span>Profile</span> <div className="dropdown-content"><li><Link to={"/login"} onClick={handleClick}>Logout</Link></li><li>Edit Profile</li>
        </div>
        </li> : <li><Link to={"/login"}>Login</Link></li>}

        {state.auth.isLoggedIn ? null : <li><Link to={"/register"}>Register</Link></li>}

      </ul>

    </nav>
  );
};

export default Nav;
//