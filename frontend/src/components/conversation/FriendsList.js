import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { v4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, List, Skeleton } from "antd";
import { OutletContext } from "./Conversation";

const FriendsList = () => {
  const API_LINK = process.env.REACT_APP_API_LINK;
  const { user_id } = useParams();
  const { setFriendId, friends, setFriends } = useContext(OutletContext);
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
  return (
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
  );
};

export default FriendsList;
