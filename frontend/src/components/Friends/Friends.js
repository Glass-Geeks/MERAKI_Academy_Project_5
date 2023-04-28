import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllFriends, setAllFriendRequests } from "../store/friends/index";
import { addFriend as pushFriend, removeFriend, addRequested, removeRequested, } from "../store/Connection";
import { setFriends, setRequested, setReceived } from "../store/Connection";
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from "axios";
import "./Friends.css"
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
  Flex,
  Input,
} from "@chakra-ui/react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import Nav from "../Navbar/Nav";

const API_LINK = process.env.REACT_APP_API_LINK;
const ContainerHeight = 400;
const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.allFriends);
  const friends_2 = useSelector((state) => state.connection.friends);
  const requested = useSelector((state) => state.connection.requested);
  const received = useSelector((state) => state.connection.received);
  const id = useSelector((state) => state.auth.userId);
  const [search, setSearch] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([])
  const [search_2, setSearch_2] = useState("")
  const [filteredSuggested, setFilteredSuggested] = useState([])
  const [suggested, setSuggested] = useState([])
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  

  const getAllFriends = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_LINK}/friends/${id}`);
      dispatch(setAllFriends(response.data.connection));
      setLoading(false);
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


  const addFriend = async (friend_id) => {
    try {
      const request = await axios.post(`${API_LINK}/friends/${id}`, {
        friend_id: friend_id,
      });
      console.log(request)
      dispatch(addRequested(friend_id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const cancelRequest = async (friend_id) => {
    try {
      const result = await axios.delete(
        `${API_LINK}/friends/delete/${id}?friend_id=${friend_id}`
      );
      dispatch(removeRequested(friend_id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const acceptFriendShip = async (friend_id) => {
    try {
      const result = await axios.put(
        `${API_LINK}/friends/requests/${friend_id}/answer`,
        { friend_id: id }
      );
      dispatch(pushFriend(friend_id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
  const deleteFriendShip = async (friend_id) => {
    try {
      const result = await axios.delete(
        `${API_LINK}/friends/delete/${friend_id}?friend_id=${id}`
      );
      await axios.delete(
        `${API_LINK}/friends/delete/${id}?friend_id=${friend_id}`
      );
      dispatch(removeFriend(friend_id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const getScrollData = async () => {
    try {
      const friendsData = await axios.get(
        `${API_LINK}/users_schools/friends/${id}`
      );
      const receivedData = await axios.get(
        `${API_LINK}/friends/requests/${id}`
      );
      const requestedData = await axios.get(
        `${API_LINK}/friends/requests/forUser/${id}`
      );
      const friend_arr = friendsData.data.result.map(
        (friend) => friend.friend_id
      );
      const received_arr = receivedData.data.connection.map(
        (received) => received.user_id
      );
      const requested_arr = requestedData.data.connection.map(
        (received) => received.user_id
      );
      suggestedContacts(friend_arr)
      dispatch(setFriends(friend_arr));
      dispatch(setRequested(requested_arr));
      dispatch(setReceived(received_arr));
      
    } catch (err) {
      console.log(err);
    }
  };
  const suggestedContacts = async (friend_arr) => {
    console.log(friend_arr)
    try {
      if(friend_arr.length){
        const response = await axios.get(`${API_LINK}/admin/users`)
        const test = response.data.data
        console.log('friends_2', friend_arr)
        const removeMe = test.filter(me => me.user_id != id)
        const removeMyFriends = removeMe.filter(friend => {
          if (!friend_arr.includes(friend.user_id)) {
            console.log(true)
            return true
  
          } else {
            return
          }
        })
        setSuggested(removeMyFriends)
        console.log(removeMyFriends)
  
      }
      
      }catch (err) {
        console.log(err)
      }
      
  }
  useEffect(() => {
    setFilteredFriends(
       friends.filter((friend) =>
        `${friend.first_name} ${friend.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
    setFilteredSuggested(
      suggested.filter((contact) =>
       `${contact.first_name} ${contact.last_name}`
         .toLowerCase()
         .includes(search_2.toLowerCase())
     )
   );
    
  }, [search, friends,suggested,search_2]);

  useEffect(() => {
    getAllFriends();
    
    getAllFriendRequests();
    getScrollData()

  }, []);

  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <>
      <Stack spacing="4">
        <Nav />
      </Stack>
      <div className="fullPage">
        <div className="friendsList">
          <ChakraProvider>
            <CSSReset />
            
            <Box px={4} py={8}mt="85px"  >
              <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Friends
              </Text>
              <Input 
            placeholder="Search Friends here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb="10px"
          />
              <VStack spacing={6} w="full">
                {filteredFriends.map((friend) => (
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
        </div>
        
        <div className="suggestedList">
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
                Suggested People
              </Text>
              <Input 
            placeholder="Search for someone to cantact.."
            value={search_2}
            onChange={(e) => setSearch_2(e.target.value)}
            mb="10px"
          />
          <div
            id="scrollableDiv"
            style={{
              height: 800,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',

            }}
          >
            <InfiniteScroll
              dataLength={filteredSuggested.length}
              next={suggestedContacts}
              hasMore={filteredSuggested.length < 1}
              loader={
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 1,
                  }}
                  active
                />
              }
              endMessage={<Divider plain>- -</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={filteredSuggested}
                renderItem={(item) => (
                  <List.Item key={item.user_id}>
                    <List.Item.Meta

                      avatar={<Avatar src={item.user_image} />}
                      title={<Text fontWeight="bold">{`${item.first_name} ${item.last_name} `}</Text>}


                    />

                    {Condition({
                      item,
                      friends_2,
                      requested,
                      received,
                      addFriend,
                      acceptFriendShip,
                      cancelRequest,
                      id,
                      deleteFriendShip,
                    })}

                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </div>
        
      </div>
    </>
  );
};
const Condition = ({
  item,
  friends_2,
  requested,
  received,
  addFriend,
  acceptFriendShip,
  cancelRequest,
  id,
  deleteFriendShip,
}) => {
  if (friends_2.indexOf(item.user_id) >= 0) {
    return (
      <>
        <Text>Friend</Text>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => {
            deleteFriendShip(item.user_id);
          }}
        >
          Delete Friendship
        </Button>
      </>
    );
  } else if (requested.indexOf(item.user_id) >= 0) {
    return (
      <Button
        colorScheme="red"
        variant="outline"
        onClick={() => {
          cancelRequest(item.user_id);
        }}
      >
        Cancel Request
      </Button>
    );
  } else if (received.indexOf(item.user_id) >= 0) {
    return (
      <Flex gap="1">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            acceptFriendShip(item.user_id);
          }}
        >
          Accept
        </Button>
      </Flex>
    );
  } else if (id === item.user_id) {
    return (
      <></>
      // <Button colorScheme="blue" variant="outline">
      //  Delete School Connection
      // </Button>
    );
  } else {
    return (
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          addFriend(item.user_id);
        }}
      >
        🔗 Connect
      </Button>
    );
  }
};

export default Friends;
