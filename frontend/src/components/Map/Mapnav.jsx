import React from "react";

import { Link } from "react-router-dom";
import Nav from "../Navbar/Nav";
const MapNav = () => {
  const logout = <Link to={"/schools"}>Home</Link>;
  return <Nav links={{ home }} />;
};

export default MapNav;
