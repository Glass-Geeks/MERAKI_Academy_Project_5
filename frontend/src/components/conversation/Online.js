import React from "react";

const Online = ({ user }) => {
  return (
    <div className="chatOnlineFriend">
      <div className="chatOnlineImgContainer">
        <img className="chatOnlineImg" src={user.user_image} alt="" />
        <div className="chatOnlineBadge"></div>
      </div>
      <span className="chatOnlineName">
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
};

export default Online;

// import React from "react";
// import { Box, Text, Image } from "@chakra-ui/react";

// const Online = ({ user }) => {
//   return (
//     <Box d="flex" alignItems="center" mb="2">
//       <Box position="relative">
//         <Image
//           borderRadius="full"
//           boxSize="2rem"
//           src={user.user_image}
//           alt=""
//         />
//         <Box
//           position="absolute"
//           bottom="0"
//           right="0"
//           bgColor="green.500"
//           borderRadius="full"
//           boxSize="0.5rem"
//         ></Box>
//       </Box>
//       <Text ml="2" fontSize="md">
//         {user.first_name} {user.last_name}
//       </Text>
//     </Box>
//   );
// };

// export default Online;
