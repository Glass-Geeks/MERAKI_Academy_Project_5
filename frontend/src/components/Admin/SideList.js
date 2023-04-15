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
      <NavItem to="" hoverColor={hoverColor}>
        Numbers
      </NavItem>
      <NavItem to="users" hoverColor={hoverColor}>
        Users
      </NavItem>
      <NavItem to="schools" hoverColor={hoverColor}>
        Schools
      </NavItem>
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
