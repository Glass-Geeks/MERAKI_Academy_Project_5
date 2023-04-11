
import React, { useEffect, useState } from "react";

import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
const Tea_stu_card = ({ data }) => {
  // console.log('data :>> ', data);

  const addFriend = () => {
    console.log("Hello Stranger");
  };
  return (
    <>

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
        <InfiniteScroll
          dataLength={data.length}
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
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item}>
                <List.Item.Meta
                  avatar={<Avatar src={item.user_image} />}
                  title={
                    <h4
                      style={{ color: "#fcfeff" }}
                    >{`${item.first_name}  ${item.last_name}`}</h4>
                  }
                />

                <div
                  onClick={addFriend}
                  className="Connect-Btn"
                  style={{ color: "#fcfeff" }}
                >
                  🔗 Connect
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

    </>
  );
};

export default Tea_stu_card;


api = 'localhost:5000/message'