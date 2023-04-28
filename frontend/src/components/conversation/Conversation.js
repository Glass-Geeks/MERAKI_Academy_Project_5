import { createContext, useEffect, useRef, useState } from "react";
import Nav from "../Navbar/Nav";
import { Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./conversation.css";
import axios from "axios";
import Online from "./Online";
import FriendsList from "./FriendsList";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
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
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [socket, setSocket] = useState(io(API_LINK, { autoConnect: false }));
  const sendMessage = () => {
    const obj = { sender: user_id, receiverId: friendId, text, connection_id };
    socket.emit("SEND_MESSAGE", obj);
    setText("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      getFriends();
      socket.connect();
      socket.emit("ADD_USER", user_id);
      socket.on("GET_USERS", (users) => {
        const test = []
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          for (let indx = 0; indx < friends.length; indx++) {
            const element2 = friends[indx];
            if (element.userId == element2.friend_id) {
              test.push(element2)
            }
          }
        }
        setOnline(test);
      });
      getMessageList();
    }

    return () => {
      socket.removeAllListeners();
      socket.close()
    };
  }, [connection_id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    socket.on("RECEIVE_MESSAGE", (data) => {
      const newArr = [...messageList, data.messages[data.messages.length - 1]];
      setMessageList(newArr);
    });
  }, [messageList]);

  const getMessageList = async () => {
    try {
      const data = await axios.get(`${API_LINK}/message/${connection_id}`);
      setMessageList(data?.data?.result?.messages);
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
    setFriendId,
    sendMessage,
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
            <FriendsList />
          </div>

          <div className="Messages">
            <div
              className="chatBox"
              style={{ overflowX: "auto", height: "600px" }}
            >
              <div className="chatBoxWrapper">
                <Outlet />
              </div>
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
          </div>

          <div className="chatOnline">
            <h2>Online Friends</h2>
            {online.length && online.map((user) => (
              <Online user={user} key={v4()} />
            ))}
          </div>
        </MessengerContext.Provider>
      </div>
    </>
  );
};

export default Conversation;
