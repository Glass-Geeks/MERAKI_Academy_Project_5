import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { MessengerContext } from "./Conversation";
import { v4 } from "uuid";
import axios from "axios";
const API_LINK = process.env.REACT_APP_API_LINK;

const ChatBox = () => {
  const [myImg, setMyImg] = useState("");
  const [friendImg, setFriendImg] = useState("");
  const {
    user_id,
    connection_id,
    messageList,
    scrollRef,
  } = useContext(MessengerContext);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const data = await axios.get(`${API_LINK}/message/img/${connection_id}`);
      const images = data.data.data[0];
      setFriendImg(images.user_image);
      setMyImg(images.my_image);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
      <div className="chatBoxTop">
        {messageList?.map((message) => (
          <div key={v4()} ref={scrollRef}>
            <Message
              message={message}
              own={message.sender === user_id}
              img={{ myImg, friendImg }}
            />
          </div>
        ))}
      </div>

      <span className="noConversationText"></span>
    </>
  );
};

export default ChatBox;
