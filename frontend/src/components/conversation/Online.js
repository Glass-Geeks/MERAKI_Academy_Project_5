import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OutletContext } from "./Conversation";
import { useParams } from "react-router-dom";
const Online = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user_id} = useParams()
  const {
    friendId,
    setFriendId,
    friends,
    setFriends,
    onlineFriends,
    setOnlineFriends,
    onlineUsers,
    setOnlineUsers,
  } = useContext(OutletContext);

  useEffect(() => {
    setOnlineFriends(friends.filter((friend) => onlineUsers.map(users=>users === friend.friend_id)));
  }, [friends, onlineUsers]);

 console.log('onlineFriends :>> ', onlineFriends);
  return (
    <div className="chatOnline">
      <h2>Online Friends</h2>

      {onlineFriends.map((online) => {
       
        return(
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={online.user_image}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online?.first_name} {online?.last_name}</span>
        </div>
      )})}
    </div>
  );
};

export default Online;
