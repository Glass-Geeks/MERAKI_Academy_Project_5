import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllFriends, setAllFriendRequests } from "../store/friends/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import Nav from "../Navbar/Nav";

const API_LINK = process.env.REACT_APP_API_LINK;

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.allFriends);
  const id = useSelector((state) => state.auth.userId);
  const toast = useToast();
  const navigate = useNavigate();

  const getAllFriends = async () => {
    try {
      const response = await axios.get(`${API_LINK}/friends/${id}`);
      dispatch(setAllFriends(response.data.connection));
    } catch (err) {
      console.log(err);
    }
  };

  const getAllFriendRequests = async () => {
    try {
      const response = await axios.get(`${API_LINK}/friends/requests/${id}`);
      dispatch(setAllFriendRequests(response.data.connection));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFriend = async (friendId) => {
    try {
      await axios.delete(
        `${API_LINK}/friends/delete/${id}?friend_id=${friendId}`
      );
      await axios.delete(
        `${API_LINK}/friends/delete/${friendId}?friend_id=${id}`
      );
      getAllFriends();
      toast({
        title: "Friend Deleted",
        description: "You'r friend now will be removed from your list",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
    <>
      <Stack spacing="4">
        <Nav />
      </Stack>
      <ChakraProvider>
        <CSSReset />
        <Box px={4} py={8} mt="85px">
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Friends
          </Text>
          <VStack spacing={6} w="full">
            {friends.map((friend) => (
              <Box
                key={friend.connection_id}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="md"
                p={4}
                w="full"
                boxShadow="md"
              >
                <HStack spacing={4}>
                  <Image
                    boxSize="75px"
                    borderRadius="full"
                    src={friend.user_image}
                    alt={friend.first_name + " " + friend.last_name}
                  />
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" fontSize="lg">
                      {friend.first_name} {friend.last_name}
                    </Text>
                    <HStack>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        onClick={() => {
                          navigate(`/messages/${id}`);
                        }}
                      >
                        Message
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => {
                          deleteFriend(friend.friend_id);
                        }}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Friends;
