import React, { useState, useEffect } from "react";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { Box, VStack, HStack, Text, Button } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { SimpleGrid } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { setAllFriends, setAllFriendRequests } from "../store/friends/index";
import InfiniteScroll from "react-infinite-scroll-component";
const id = localStorage.getItem("userId");
const API_LINK = process.env.REACT_APP_API_LINK;

const Tea_stu_card = ({ data }) => {
  const dispatch = useDispatch();
  // const getAllFriends = async () => {
  //   try {
  //     const response = await axios.get(`${API_LINK}/friends/${id}`);
  //     dispatch(setAllFriends(response.data.connection));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [friends, setFriends] = useState("");

  useEffect(() => {
    // getAllFriends();
  }, []);

  const addFriend = () => {
    console.log("Hello Stranger");
  };

  return (
    <>
      <Box
        id="scrollableDiv"
        h="400px"
        w="500px"
        overflowY="auto"
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <InfiniteScroll
          dataLength={data.length}
          hasMore={false}
          loader={
            <Skeleton>
              <HStack>
                <Avatar />
                <Text>Name</Text>
              </HStack>
            </Skeleton>
          }
          scrollableTarget="scrollableDiv"
        >
          <VStack align="stretch" spacing={4}>
            {data.map((item) => (
              <HStack
                key={item.id}
                p="4"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack>
                  <Avatar src={item.user_image} />
                  <Text fontWeight="bold">
                    {`${item.first_name} ${item.last_name}`}
                  </Text>
                </HStack>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={addFriend}
                >
                  🔗 Connect
                </Button>
              </HStack>
            ))}
          </VStack>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default Tea_stu_card;

// import React, { useState, useEffect } from "react";
// import { Avatar } from "@chakra-ui/avatar";
// import axios from "axios";
// import { Box, VStack, HStack, Text, Button } from "@chakra-ui/react";
// import { Skeleton } from "@chakra-ui/skeleton";
// import { SimpleGrid } from "@chakra-ui/layout";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllFriends, setAllFriendRequests } from "../store/friends/index";
// import InfiniteScroll from "react-infinite-scroll-component";

// const id = localStorage.getItem("userId");
// const API_LINK = process.env.REACT_APP_API_LINK;

// const Tea_stu_card = ({ data }) => {
//   console.log(data);
//   const dispatch = useDispatch();
//   const [friends, setFriends] = useState("");

//   const sendFriendRequest = async (friendId) => {
//     try {
//       const response = await axios.post(`${API_LINK}/friends/${id}`, {
//         friend_id: friendId,
//       });
//       console.log("Friend request sent");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteFriendRequest = async (friendId) => {
//     try {
//       const response = await axios.delete(`${API_LINK}/friends/delete/${id}`, {
//         data: { friend_id: friendId },
//       });
//       console.log("Friend request deleted");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteFriend = async (friendId) => {
//     try {
//       const response = await axios.delete(`${API_LINK}/friends/delete/${id}`, {
//         data: { friend_id: friendId },
//       });
//       console.log("Friend deleted");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getButton = (status, friendId) => {
//     switch (status) {
//       case "NotConnected":
//         return (
//           <Button
//             colorScheme="blue"
//             variant="outline"
//             onClick={() => sendFriendRequest(friendId)}
//           >
//             🔗 Connect
//           </Button>
//         );
//       case "Pending":
//         return (
//           <Button
//             colorScheme="orange"
//             variant="outline"
//             onClick={() => deleteFriendRequest(friendId)}
//           >
//             ❌ Delete Request
//           </Button>
//         );
//       case "Accepted":
//         return (
//           <Button
//             colorScheme="red"
//             variant="outline"
//             onClick={() => deleteFriend(friendId)}
//           >
//             ❌ Delete Friend
//           </Button>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Box
//         id="scrollableDiv"
//         h="400px"
//         w="500px"
//         overflowY="auto"
//         p="4"
//         borderWidth="1px"
//         borderColor="gray.200"
//       >
//         <InfiniteScroll
//           dataLength={data.length}
//           hasMore={false}
//           loader={
//             <Skeleton>
//               <HStack>
//                 <Avatar />
//                 <Text>Name</Text>
//               </HStack>
//             </Skeleton>
//           }
//           scrollableTarget="scrollableDiv"
//         >
//           <VStack align="stretch" spacing={4}>
//             {data.map((item) => (
//               <HStack
//                 key={item.id}
//                 p="4"
//                 bg="white"
//                 borderRadius="md"
//                 boxShadow="md"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <HStack>
//                   <Avatar src={item.user_image} />
//                   <Text fontWeight="bold">
//                     {`${item.first_name} ${item.last_name}`}
//                   </Text>
//                 </HStack>
//                 {getButton(item.friendshipStatus, item.id)}
//               </HStack>
//             ))}
//           </VStack>
//         </InfiniteScroll>
//       </Box>
//     </>
//   );
// };

// export default Tea_stu_card;
