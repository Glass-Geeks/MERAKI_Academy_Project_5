import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllFriends, setAllFriendRequests } from "../store/friends/index";
import axios from "axios";
import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  useToast,
  useColorModeValue,
  extendTheme,
} from "@chakra-ui/react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

const API_LINK = process.env.REACT_APP_API_LINK;

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.allFriends);
  const friendRequests = useSelector((state) => state.friends.friendRequests);
  console.log(friends);

  const getAllFriends = async () => {
    const id = localStorage.getItem("userId");
    console.log(id);
    try {
      const response = await axios.get(`${API_LINK}/friends/${id}`);
      dispatch(setAllFriends(response.data.connection));
      console.log(response.data.connection);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllFriendRequests = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await axios.get(`${API_LINK}/friends/requests/${id}`);
      dispatch(setAllFriendRequests(response.data.connection));
      console.log(response.data.connection);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFriend = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await axios.get(`${API_LINK}/friends/delete/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllFriends();
    getAllFriendRequests();
  }, []);

  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <ChakraProvider>
      <CSSReset />
      <VStack spacing={4} w="full">
        {friends.map((friend) => (
          <Box
            key={friend.id}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            w="full"
          >
            <HStack spacing={4}>
              <Image
                boxSize="50px"
                borderRadius="full"
                src={friend.user_image}
                alt={friend.first_name + " " + friend.last_name}
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">
                  {friend.first_name} {friend.last_name}
                </Text>
                <HStack>
                  <Button size="sm" colorScheme="teal">
                    Message
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={deleteFriend}>
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </ChakraProvider>
  );
};

export default Friends;
