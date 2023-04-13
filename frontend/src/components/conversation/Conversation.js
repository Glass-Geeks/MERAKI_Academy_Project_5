import React, { useEffect, useState } from "react";
import "./conversation.css";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container } from "../Styled/Container.Styled";
import { Col } from "../Styled/Column.Styled";
import {v4} from 'uuid';
const Conversation = () => {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const sender = useSelector((state) => state.auth.userName);
  const user_id = useSelector((state) => state.auth.userId);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [room_id, setRoom_id] = useState(null);
  const socket = io(API_LINK, { autoConnect: false });

  useEffect(() => {
    getFriends();
    getPastMessages()
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
      setMessages(data.data.result.messages)
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <>
      <Container className="conversation-page">
        <Col>
          {friends.map((friend) => (
            <div className="friend" key={v4()}>
              <img src={friend.user_image} alt="" width={"20px"} />
              <p>
                {friend.first_name} {friend.last_name}
              </p>
            </div>
          ))}
        </Col>
        <Col>
          <div>
            {messages.map((message) => (
              <p key={v4()}>
                {message.sender} {message.message}
              </p>
            ))}
          </div>
          <div>
            <input
              style={{ border: "2px solid black" }}
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />{" "}
            <button onClick={sendMessage}>send</button>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default Conversation;
