import React, { useEffect, useState } from "react";
import "./coversation.css"
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container } from "../Styled/Container.Styled";
import { Col } from "../Styled/Column.Styled";
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
    socket.connect().emit("JOIN_ROOM", `room${id}`);
    socket.connect().on("RECEIVE_MESSAGE", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = () => {
    const messageContent = {
      roomId: `room${id}`,
      sender,
      message,
    };
    socket.connect().emit("SEND_MESSAGE", messageContent);
    setMessage("");
  };
  return (
    <>
      <Container className="conversation-page">
        <Col>
          {friends.map((friend) => (
            <div className="friend">
              <img src={friend.user_image} alt="" width={"20px"} />
              <p>
                {friend.first_name} {friend.last_name}
              </p>
            </div>
          ))}
        </Col>
        <Col>
          <ul>
            {messages.map((message) => (
              <li key={message.message}>
                {message.sender} {message.message}
              </li>
            ))}
          </ul>
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
