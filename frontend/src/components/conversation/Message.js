import { format } from "timeago.js";
const Message = ({ message, own, img }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          <img className="messageImg" src={img.myImg} alt="" />
        ) : (
          <img className="messageImg" src={img.friendImg} alt="" />
        )}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;

// import { format } from "timeago.js";
// import { Box, Text, Image } from "@chakra-ui/react";

// const Message = ({ message, own, img }) => {
//   return (
//     <Box
//       d="flex"
//       flexDirection="column"
//       alignItems={own ? "flex-end" : "flex-start"}
//     >
//       <Box d="flex" alignItems="center">
//         <Image
//           borderRadius="full"
//           boxSize="2rem"
//           src={own ? img.myImg : img.friendImg}
//           alt=""
//         />
//         <Text ml="2" fontSize="md" bgColor="gray.300" p="2" borderRadius="md">
//           {message.text}
//         </Text>
//       </Box>
//       <Text fontSize="sm" mt="1">
//         {format(message.createdAt)}
//       </Text>
//     </Box>
//   );
// };

// export default Message;
