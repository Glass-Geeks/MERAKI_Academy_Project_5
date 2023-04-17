import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { setLogout } from "../store/auth/index";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

const Nav = ({ links }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user_id = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);

  const handleClick = () => {
    localStorage.clear();
    dispatch(setLogout());
    navigate("/");
  };

  const bg = useColorModeValue("gray.100", "gray.900");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box boxShadow="md" px={4} bg={bg} position="fixed" w="100%" zIndex={100} mb="85px">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to={"/"}>
          <Heading size="md">Logo</Heading>
        </Link>
        <Spacer />
        <Box display={{ base: "none", md: "flex" }}>
          {role === "ADMIN" && isLoggedIn && (
            <Link to={"/admin"}>
              <Button colorScheme="teal" variant="ghost">
                Dashboard
              </Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to={`/messages/${user_id}`}>
              <Button colorScheme="teal" variant="ghost">
                Messages
              </Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to={"/friends"}>
              <Button colorScheme="teal" variant="ghost">
                Friends
              </Button>
            </Link>
          )}
          {isLoggedIn ? (
            <Menu>
              <MenuButton as={Button} colorScheme="teal" variant="ghost">
                Profile
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to={"/login"} onClick={handleClick}>
                    Logout
                  </Link>
                </MenuItem>
                <MenuItem>Edit Profile</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to={"/login"}>
              <Button colorScheme="teal" variant="ghost">
                Login
              </Button>
            </Link>
          )}

          {isLoggedIn ? null : (
            <Link to={"/register"}>
              <Button colorScheme="teal" variant="solid">
                Register
              </Button>
            </Link>
          )}
        </Box>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          colorScheme="teal"
          aria-label="Open menu"
          icon={<HamburgerIcon />}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {role === "ADMIN" && (
                <RouterLink to={"/admin"}>
                  <Button colorScheme="teal" variant="ghost" onClick={onClose}>
                    Dashboard
                  </Button>
                </RouterLink>
              )}
              {isLoggedIn && (
                <RouterLink to={`/messages/${user_id}`}>
                  <Button colorScheme="teal" variant="ghost" onClick={onClose}>
                    Messages
                  </Button>
                </RouterLink>
              )}
              {isLoggedIn && (
                <RouterLink to={"/friends"}>
                  <Button colorScheme="teal" variant="ghost" onClick={onClose}>
                    Friends
                  </Button>
                </RouterLink>
              )}
              {isLoggedIn ? (
                <Menu>
                  <MenuButton as={Button} colorScheme="teal" variant="ghost">
                    Profile
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <RouterLink to={"/login"} onClick={handleClick}>
                        Logout
                      </RouterLink>
                    </MenuItem>
                    <MenuItem>Edit Profile</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <RouterLink to={"/login"}>
                  <Button colorScheme="teal" variant="ghost" onClick={onClose}>
                    Login
                  </Button>
                </RouterLink>
              )}

              {isLoggedIn ? null : (
                <RouterLink to={"/register"}>
                  <Button colorScheme="teal" variant="solid" onClick={onClose}>
                    Register
                  </Button>
                </RouterLink>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Nav;
