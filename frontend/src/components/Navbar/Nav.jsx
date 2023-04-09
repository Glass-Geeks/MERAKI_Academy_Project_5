import React from "react";
import { NavBar } from "../Styled/Navbar.styled";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <NavBar>
      <Link className="links" to={"/"}>Home</Link>
      <Link className="links" to={"/login"}>Login</Link>
    </NavBar>
  );
};

export default Nav;
