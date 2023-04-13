import React from "react";
import { Link } from "react-router-dom";

const SideList = () => {
  return (
    <div className="side-list-admin">
      <Link to="basic">Basic</Link>
      <Link to="users">Users</Link>
      <Link to="schools">Schools</Link>
      <Link to="history">History</Link>
      <Link to="theme">Theme</Link>
      <Link to="authorize">Authorize</Link>
    </div>
  );
};

export default SideList;
