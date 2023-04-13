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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user_id = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);

  
  const handleClick = () => {
    localStorage.clear()
    dispatch(setLogout())
    navigate("/")
  }
  return (
    <nav className="navbar">
      <Link to={"/"} className="logo">Logo</Link>
      <ul className="nav-links">
        {role === 'ADMIN' && <li><Link to={"/admin"}>Dashboard</Link></li>}
        {isLoggedIn&&<li><Link to={`/friends/${user_id}`}>Messages</Link></li>}
        {isLoggedIn&&<li><Link to={'/friends'}>Friends</Link></li>}
        {isLoggedIn ? <li className="dropdown"><span>Profile</span> <div className="dropdown-content"><li><Link to={"/login"} onClick={handleClick}>Logout</Link></li><li>Edit Profile</li>
        </div>
        </li> : <li><Link to={"/login"}>Login</Link></li>}

        {isLoggedIn ? null : <li><Link to={"/register"}>Register</Link></li>}

      </ul>

    </nav>
  );
};

export default Nav;
//