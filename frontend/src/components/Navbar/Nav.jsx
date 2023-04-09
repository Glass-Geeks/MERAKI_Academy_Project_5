import React from "react";
import { NavBar } from "../Styled/Navbar.styled";
import { Link } from "react-router-dom";
const Nav = ({ links }) => {
  console.log('links :>> ', links);
  return (
    <NavBar>
      <div className="home-logo">
        <Link className="links" to={"/"}>
          Home
        </Link>
      </div>
      <div className="nav-links">
        {links?.home}
        </div>
    </NavBar>
  );
};

export default Nav;
