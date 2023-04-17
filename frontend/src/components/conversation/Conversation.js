import { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, List, Skeleton } from "antd";
import { io } from "socket.io-client";
import { v4 } from "uuid";

import "./conversation.css";
import axios from "axios";

const API_LINK = process.env.REACT_APP_API_LINK;

const Conversation = () => {
  const { user_id, connection_id } = useParams();
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [online, setOnline] = useState([]);
  const [friendId, setFriendId] = useState("");
  // const socket = io(API_LINK, { autoConnect: false });
  const [socket, setSocket] = useState(io(API_LINK, { autoConnect: false }));

  const sendMessage = () => {
    const obj = { sender: user_id, receiverId: 54, text, connection_id };
    socket.emit("SEND_MESSAGE", obj);
  };

  useEffect(() => {
    if(true){}
    socket.connect()
    socket.emit("ADD_USER", user_id);
    // socket.on("GET_USERS",users)
    getFriends();
    getMessageList();
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      console.log("data :>> ", data);
      const newArr = [...messageList, data]
      console.log(newArr);
      setMessageList(newArr);
    });
  }, [messageList]);


  const getMessageList = async () => {
    try {
      const data = await axios.get(`${API_LINK}/message/${connection_id}`);
      setMessageList(data.data.result.messages);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const getFriends = async () => {
    try {
      const data = await axios.get(`${API_LINK}/friends/${user_id}`);
      setFriends(data.data.connection);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
      <Nav />
      <br />
      <br />
      <br />
      <div className="messagePage">
        <div className="friends">
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
            <h2>Friends</h2>
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
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={friends}
                renderItem={(item) => (
                  <List.Item key={item}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.user_image} />}
                      title={<h4>{`${item.first_name}  ${item.last_name}`}</h4>}
                    />
                    <Link
                      className="Connect-Btn"
                      to={`${item.connection_id}`}
                      onClick={() => setFriendId(item.friend_id)}
                    >
                      🔗 Message
                    </Link>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </div>

        <div className="Messages">
          <div className="chatBox">
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                {console.log("messageList :>> ", messageList)}
                {messageList.map((message) => (
                  <p>{message.text}</p>
                ))}
              </div>
              <div className="chatBoxBottom">
                <input
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <button className="chatSubmitButton" onClick={sendMessage}>
                  Send
                </button>
              </div>

              <span className="noConversationText"></span>
            </div>
          </div>
        </div>

        <div className="Online">
          {/* <Online /> */}
          <div className="chatOnline">
            <h2>Online Friends</h2>
            {/* 
      {onlineFriends.map((online) => {
       
        return(
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={''}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online?.first_name} {online?.last_name}</span> 
        </div>
      )})} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
