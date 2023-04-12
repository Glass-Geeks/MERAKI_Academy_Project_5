import React, { useEffect, useState } from "react";
import ConversationNav from "./ConversationNav";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from 'axios';
const Conversation = () => {
  const API_LINK = "http://localhost:5000";
  const sender = useSelector((state) => state.auth.userName);
  console.log("sender :>> ", sender);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io.connect(API_LINK);
  const joinRoom = () => {
    socket.emit("JOIN_ROOM", id);
  };
  const sendMessage = () => {
    const messageContent = {
      roomId: id,
      content: { sender, message },
    };
    socket.emit("SEND_MESSAGE",messageContent)
    setMessages([...messages,messageContent.content])
  };

  useEffect(() => {
    joinRoom();
    getAllMessages();
    getTest()
  });
  const getAllMessages = () => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  };
const getTest = async()=>{
    try {
        const result = await axios.get(`http://localhost:5000/message/${id}`)
    console.log('result.data :>> ', result.data);
    } catch (error) {
        console.log('error :>> ', error);
    }
}
  return (
    <>
      <ConversationNav />
      <ul>
        {messages.map((message) => (
          <li key={message.message}>{message.sender} {message.message}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />{" "}
        <button onClick={sendMessage}>send</button>
      </div>
    </>
  );
};

export default Conversation;
