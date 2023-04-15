// import React from "react";
// import { Link } from "react-router-dom";

// const SideList = () => {
//   return (
//     <div className="side-list-admin">
//       <Link to="basic">Basic</Link>
//       <Link to="users">Users</Link>
//       <Link to="schools">Schools</Link>
//       <Link to="history">History</Link>
//       <Link to="theme">Theme</Link>
//       <Link to="authorize">Authorize</Link>
//     </div>
//   );
// };

// export default SideList;

import React from "react";
import { VStack, Link, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SideList = () => {
  const hoverColor = useColorModeValue("gray.300", "gray.600");

  return (
    <VStack
      as="nav"
      p={4}
      spacing={4}
      alignItems="flex-start"
      borderRadius="md"
      width={["100%", "100%", "25%"]}
      position="sticky"
      top="1rem"
    >
      <NavItem to="/admin/basic" hoverColor={hoverColor}>Basic</NavItem>
      <NavItem to="/admin/users" hoverColor={hoverColor}>Users</NavItem>
      <NavItem to="/admin/schools" hoverColor={hoverColor}>Schools</NavItem>
      <NavItem to="/admin/history" hoverColor={hoverColor}>History</NavItem>
      <NavItem to="/admin/theme" hoverColor={hoverColor}>Theme</NavItem>
      <NavItem to="/admin/authorize" hoverColor={hoverColor}>Authorize</NavItem>
    </VStack>
  );
};

const NavItem = ({ to, hoverColor, children }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      fontWeight="bold"
      fontSize="lg"
      _hover={{
        bg: hoverColor,
        borderRadius: "md",
        textDecoration: "none",
      }}
      px={4}
      py={2}
      rounded="md"
    >
      {children}
    </Link>
  );
};

export default SideList;
