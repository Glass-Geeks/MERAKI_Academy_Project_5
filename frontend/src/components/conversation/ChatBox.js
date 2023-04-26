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
    scrollRef, friendId
  } = useContext(MessengerContext);
  useEffect(() => {
    getImages();
  }, [connection_id]);

  const getImages = async () => {
console.log('friendId :>> ', friendId);
    try {
      const data = await axios.get(`${API_LINK}/message/img/${friendId}?user_id=${user_id}`);
      const images = data.data.data[0];
    
      console.log('data.data :>> ', data.data);
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
