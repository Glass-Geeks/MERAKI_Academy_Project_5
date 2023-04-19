import { createContext, useEffect, useRef, useState } from "react";
import Nav from "../Navbar/Nav";
import { Link, Outlet, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, List, Skeleton } from "antd";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import "./conversation.css";
import axios from "axios";
import Online from "./Online";
const API_LINK = process.env.REACT_APP_API_LINK;
export const MessengerContext = createContext();
const Conversation = () => {
  const { user_id, connection_id } = useParams();
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [online, setOnline] = useState([]);
  const [friendId, setFriendId] = useState("");
  const scrollRef = useRef();
  const [socket, setSocket] = useState(io(API_LINK, { autoConnect: false }));

  const sendMessage = () => {
    const obj = { sender: user_id, receiverId: friendId, text, connection_id };
    socket.emit("SEND_MESSAGE", obj);
    setText('')
  };

  useEffect(() => {
    if (true) {
    }
    socket.connect();
    socket.emit("ADD_USER", user_id);
    socket.on("GET_USERS", (users) => {
      setOnline(
        friends.filter((friend) =>
          users.map((user) => friend.friend_id != user.userId)
        )
      );
    });
    getFriends();
    getMessageList();
    return () => {
      socket.removeAllListeners();
    };
  }, [connection_id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    socket.on("RECEIVE_MESSAGE", (data) => {
      const newArr = [...messageList, data.messages[data.messages.length -1]];
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
  const VALUE = {
    user_id,
    connection_id,
    text,
    scrollRef,
    setText,
    messageList,
    setMessageList,
    friends,
    setFriends,
    online,
    setOnline,
    friendId,
    setFriendId,sendMessage
  };
  return (
    <>
      <Nav />
      <br />
      <br />
      <br />
      <div className="messagePage">
        <MessengerContext.Provider value={VALUE}>
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
                    <List.Item key={v4()}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.user_image} />}
                        title={
                          <h4>{`${item.first_name}  ${item.last_name}`}</h4>
                        }
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
                <Outlet />
              </div>
            </div>
          </div>

          <div className="chatOnline">
            <h2>Online Friends</h2>
            {online.map((user) => (
              <Online user={user} />
            ))}
          </div>
        </MessengerContext.Provider>
      </div>
    </>
  );
};

export default Conversation;

