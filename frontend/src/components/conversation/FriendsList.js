import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, List, Skeleton } from "antd";
import { MessengerContext } from "./Conversation";

const FriendsList = () => {
  const { setFriendId, friends } = useContext(MessengerContext);

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
            <List.Item key={v4()}>
              <List.Item.Meta
                avatar={<Avatar src={item.user_image} />}
                title={`${item.first_name}  ${item.last_name}`}
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
