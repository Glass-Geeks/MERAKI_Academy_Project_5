import React, { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import "./conversation.css";
import Nav from "../Navbar/Nav";
import FriendsList from "./FriendsList";
import Online from "./Online";
import { io } from "socket.io-client";
export const OutletContext = createContext();
const Conversation = () => {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const [friendId, setFriendId] = useState("");
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user_id } = useParams();
  const socket = io(API_LINK, { autoConnect: false });

  useEffect(() => {
    socket.connect().emit("ADD_USER", user_id);
    console.log("friends :>> ", friends);
    socket.connect().on("GET_USERS", (users) => {
      console.log("users :>> ", users);
      setOnlineUsers(users.map((user) => user.userId));
    });
  }, [user_id]);
  const value = {
    friendId,
    setFriendId,
    friends,
    setFriends,
    onlineFriends,
    setOnlineFriends,
    onlineUsers,
    setOnlineUsers,
  };
  console.log("onlineFriends :>> ", onlineUsers);
  return (
    <>
      <Nav />
      <br />
      <br />
      <br />
      <div className="messagePage">
        <OutletContext.Provider value={value}>
          <div className="friends">
            <FriendsList />
          </div>

          <div className="Messages">
            <Outlet />
          </div>

          <div className="Online">
            <Online />
          </div>
        </OutletContext.Provider>
      </div>
    </>
  );
};

export default Conversation;
