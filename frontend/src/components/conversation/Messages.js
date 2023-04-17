import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { OutletContext } from "./Conversation";
const Messages = () => {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const { connection_id, user_id } = useParams();
  const { friendId } = useContext(OutletContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = io(API_LINK, { autoConnect: false });
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const message = {
  //     sender: user_id,
  //     text: newMessage,
  //     conversationId: currentChat._id,
  //   };

  //   const receiverId = currentChat.members.find((member) => member !== user_id);

  //   socket.current.emit("sendMessage", {
  //     senderId: user_id,
  //     receiverId,
  //     text: newMessage,
  //   });

  //   try {
  //     const res = await axios.post("/messages", message);
  //     setMessages([...messages, res.data]);
  //     setNewMessage("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
console.log('friendId :>> ', friendId);
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  useEffect(() => {
    getPastMessages();
  }, []);
  useEffect(() => {
    // socket.emit("JOIN_ROOM", connection_id);
    socket.connect().on("RECEIVE_MESSAGE", (data) => {
      console.log("data :>> ", data);
      setMessages([...messages, data]);
    });
  }, [messages]);
  const sendMessage = () => {
    const messageContent = {
      sender: user_id,
      receiverId: friendId,
      message,
      roomId: connection_id,
    };
    socket.connect().emit("SEND_MESSAGE", messageContent);
    setMessage("");
  };
  const getPastMessages = async () => {
    try {
      const data = await axios.get(`${API_LINK}/message/${connection_id}`);
      console.log("data.data.result :>> ", data.data.result);
      setMessages(data.data.result.messages);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {messages ? (
            <>
              <div className="chatBoxTop">
                {messages.map((em) => (
                  <div ref={scrollRef}>{em.message}</div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <input
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button className="chatSubmitButton" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
