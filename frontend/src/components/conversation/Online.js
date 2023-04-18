import React from "react";

const Online = ({ user }) => {
  return (

        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={user.user_image}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{user.first_name} {user.last_name}</span>
        </div>
   
  );
};

export default Online;
