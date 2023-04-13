import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { v4 } from "uuid";
import { Box,Container,VStack,HStack,Image,Text,Input, Button,} from "@chakra-ui/react";
import { Avatar, Divider, List, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./conversation.css"
const Conversation = () => {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const sender = useSelector((state) => state.auth.userName);
  const user_id = useSelector((state) => state.auth.userId);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [room_id, setRoom_id] = useState(null);
  const navigate = useNavigate()
  const socket = io(API_LINK, { autoConnect: false });

  useEffect(() => {
    getFriends();
    getPastMessages();
  }, []);

  const getFriends = async () => {
    try {
      const data = await axios.get(`${API_LINK}/friends/${user_id}`);
      setFriends(data.data.connection);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    socket.connect().emit("JOIN_ROOM", id);
    socket.connect().on("RECEIVE_MESSAGE", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = () => {
    const messageContent = {
      roomId: id,
      sender,
      message,
    };
    socket.connect().emit("SEND_MESSAGE", messageContent);
    setMessage("");
  };

  const getPastMessages = async () => {
    try {
      const data = await axios.get(`${API_LINK}/message/${id}`);
      setMessages(data.data.result.messages);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
    <br></br>
    <div className="messagePage">
    <div
        id="scrollableDiv"
        style={{
          height: 400,
          width: 500,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid #fcfeff",
        }}
      >
        <InfiniteScroll
          dataLength={friends.length}
          hasMore={false}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={friends}
            renderItem={(item) => (
              <List.Item key={item}>
                <List.Item.Meta
                  avatar={<Avatar src={item.user_image} />}
                  title={
                    <h4>{`${item.first_name}  ${item.last_name}`}</h4>
                  }
                />

                <div className="Connect-Btn" onClick={()=>{
                  navigate(`/friends/${item.connection_id}`)
                }} >
                  🔗 Message
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
        
      </div>
      <hr className="hr"></hr>
      <div>
      <VStack alignItems="start" w="100%">
              {messages.map((message) => (
                <Text key={v4()} fontWeight="medium">
                  {message.sender}: {message.message}
                </Text>
              ))}
            </VStack>
      <HStack w="100%">
              <Input
                flexGrow={1}
                border="2px solid black"
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Button colorScheme="blue" onClick={sendMessage}>
                Send
              </Button>
            </HStack>
            </div>
            </div>
    </>
  );
};

export default Conversation;

/*
<Container maxW="container.xl">
        <HStack spacing={8} w="100%">
          <VStack alignItems="start" w="50%">
            {friends.map((friend) => (
              <HStack key={v4()} spacing={4} alignItems="center">
                <Image
                  boxSize="40px"
                  borderRadius="full"
                  src={friend.user_image}
                  alt=""
                />
                <Text fontWeight="bold">
                  {friend.first_name} {friend.last_name}
                </Text>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="start" w="50%">
            <VStack alignItems="start" w="100%">
              {messages.map((message) => (
                <Text key={v4()} fontWeight="medium">
                  {message.sender}: {message.message}
                </Text>
              ))}
            </VStack>
            <HStack w="100%">
              <Input
                flexGrow={1}
                border="2px solid black"
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Button colorScheme="blue" onClick={sendMessage}>
                Send
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Container>
*/