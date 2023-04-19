import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { Box, VStack, HStack, Text, Button, Flex } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  setFriends,
  addFriend as pushFriend,
  removeFriend,
  setRequested,
  addRequested,
  removeRequested,
  setReceived,
  addReceived,
  removeReceived,
} from "../store/Connection";

const API_LINK = process.env.REACT_APP_API_LINK;

const Tea_stu_card = ({ data }) => {
  const userId = useSelector((state) => state.auth.userId);
  const friends = useSelector((state) => state.connection.friends);
  const requested = useSelector((state) => state.connection.requested);
  const received = useSelector((state) => state.connection.received);
  const dispatch = useDispatch();
  const addFriend = async (id) => {
    try {
      const request = await axios.post(`${API_LINK}/friends/${userId}`, {
        friend_id: id,
      });
      dispatch(addRequested(id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const deleteFriendShip = async (id) => {
    try {
      const result = await axios.delete(
        `${API_LINK}/friends/delete/${id}?friend_id=${userId}`
      );
      await axios.delete(
        `${API_LINK}/friends/delete/${userId}?friend_id=${id}`
      );
      dispatch(removeFriend(id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const cancelRequest = async (id) => {
    try {
      const result = await axios.delete(
        `${API_LINK}/friends/delete/${userId}?friend_id=${id}`
      );
      dispatch(removeRequested(id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const acceptFriendShip = async (id) => {
    try {
      const result = await axios.put(
        `${API_LINK}/friends/requests/${id}/answer`,
        { friend_id: userId }
      );
      dispatch(pushFriend(id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
      <Box
        id="scrollableDiv"
        h="400px"
        w="500px"
        overflowY="auto"
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <InfiniteScroll
          dataLength={data.length}
          hasMore={false}
          loader={
            <Skeleton>
              <HStack>
                <Avatar />
                <Text>Name</Text>
              </HStack>
            </Skeleton>
          }
          scrollableTarget="scrollableDiv"
        >
          <VStack align="stretch" spacing={4}>
            {data.map((item) => (
              <HStack
                key={item.first_name}
                p="4"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack>
                  <Avatar src={item.user_image} />
                  <Text fontWeight="bold">
                    {`${item.first_name} ${item.last_name}`}
                  </Text>
                </HStack>
                {Condition({
                  item,
                  friends,
                  requested,
                  received,
                  addFriend,
                  deleteFriendShip,
                  acceptFriendShip,
                  cancelRequest,
                })}
              </HStack>
            ))}
          </VStack>
        </InfiniteScroll>
      </Box>
    </>
  );
};
const Condition = ({
  item,
  friends,
  requested,
  received,
  addFriend,
  deleteFriendShip,
  acceptFriendShip,
  cancelRequest,
}) => {
  if (friends.indexOf(item.user_id) >= 0) {
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
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => {
            deleteFriendShip(item.user_id);
          }}
        >
          decline
        </Button>
      </Flex>
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

export default Tea_stu_card;
