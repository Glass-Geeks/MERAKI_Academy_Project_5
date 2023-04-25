import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { setLogout } from "../store/auth/index";
import { format } from "timeago.js";
import { v4 } from "uuid";
import axios from "axios";
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
  Image,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";

import { HamburgerIcon, BellIcon } from "@chakra-ui/icons";
const API_LINK = process.env.REACT_APP_API_LINK;
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user_id = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);

  const handleClick = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const bg = useColorModeValue("gray.100", "gray.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    getNotification();
  }, []);
  const getNotification = async () => {
    try {
      const data = await axios.get(`${API_LINK}/friends/requests/${user_id}`);
      setNotifications(data.data.connection);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const deleteFriendShip = async (id) => {
    try {
      const result = await axios.delete(
        `${API_LINK}/friends/delete/${id}?friend_id=${user_id}`
      );
      if (result.data.success) getNotification();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const acceptFriendShip = async (id) => {
    try {
      const result = await axios.put(
        `${API_LINK}/friends/requests/${id}/answer`,
        { friend_id: user_id }
      );
      if (result.data.success) getNotification();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <Box
      boxShadow="md"
      px={4}
      bg={bg}
      position="fixed"
      w="100%"
      zIndex={100}
      mb="85px"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to={"/"}>
          <Heading size="md">Logo</Heading>
        </Link>
        <Spacer />
        {isLoggedIn && (
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                colorScheme="teal"
                rightIcon={<BellIcon />}
                mr={4} // Add margin-right here
              >
                {notifications.length}
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Notification</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Flex gap="3" direction="column">
                    {notifications.length ? (
                      notifications.map((alert) => {
                        return (
                          <Card key={v4()} minH={"120"}>
                            <CardBody className="card-body-nav-notification">
                              <Flex>
                                <Image
                                  boxSize="2rem"
                                  borderRadius="full"
                                  src={alert.user_image}
                                  alt="Fluffybuns the destroyer"
                                  mr="12px"
                                />
                                <Text>
                                  {alert.first_name} {alert.last_name}
                                </Text>
                              </Flex>

                              <Box className="btns-nav-notification">
                                <Flex gap="2">
                                  <Button
                                    onClick={() =>
                                      deleteFriendShip(alert.user_id)
                                    }
                                  >
                                    Decline
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      acceptFriendShip(alert.user_id)
                                    }
                                  >
                                    Accept
                                  </Button>
                                </Flex>
                              </Box>

                              <Box className="date-nav-notification">
                                <Text>{format(alert.created_at)}</Text>
                              </Box>
                            </CardBody>
                          </Card>
                        );
                      })
                    ) : (
                      <span>There is no notification for now</span>
                    )}
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}

        <Box display={{ base: "none", md: "flex" }}>
          <Link to={"/explore"}>
            <Button colorScheme="teal" variant="ghost">
              Explore
            </Button>
          </Link>

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
                <MenuItem onClick={handleClick}>Logout</MenuItem>

                <MenuItem>
                  <Link to={"/profile"}>Edit Profile</Link>
                </MenuItem>
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
                    <MenuItem onClick={handleClick}>Logout</MenuItem>
                    <MenuItem>
                      <RouterLink to={"/profile"}>Edit Profile</RouterLink>
                    </MenuItem>
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
              <RouterLink to={"/explore"}>
                <Button colorScheme="teal" variant="ghost" onClick={onClose}>
                  Explore
                </Button>
              </RouterLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Nav;
