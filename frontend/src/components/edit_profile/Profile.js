// import React, { useEffect, useState } from "react";
// import Nav from "../Navbar/Nav";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Editable,
//   EditableInput,
//   EditablePreview,
//   Flex,
//   FormLabel,
//   IconButton,
//   Image,
//   Input,
//   useEditableControls,
// } from "@chakra-ui/react";
// import { EditIcon } from "@chakra-ui/icons";
// import { useSelector } from "react-redux";
// import { v4 } from "uuid";

// const API_LINK = process.env.REACT_APP_API_LINK;
// const Profile = () => {
//   const user_id = useSelector((state) => state.auth.userId);
//   const [user_info, setUser_info] = useState({});
//   const info = Object.entries(user_info);
//   function EditableControls() {
//     const { isEditing, getEditButtonProps } = useEditableControls();

//     return isEditing ? (
//       ""
//     ) : (
//       <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
//     );
//   }
//   useEffect(() => {
//     getMyInfo();
//   }, []);
//   const getMyInfo = async () => {
//     try {
//       const data = await axios.get(`${API_LINK}/users/${user_id}`);
//       setUser_info(data.data.result);
//     } catch (error) {
//       console.log("error :>> ", error);
//     }
//   };
//   const submitChanges = async () => {
//     const data = Object.fromEntries(info);

//     try {
//       await axios.put(`${API_LINK}/users/${user_id}`, data);
//       getMyInfo();
//     } catch (error) {
//       console.log("error :>> ", error);
//     }
//   };

//   return (
//     <>
//       <Nav />
//       <br />
//       <br />
//       <br />
//       <br />
//       <Flex gap="150">
//         <Box>
//           <Image
//             src={user_info.user_image}
//             boxSize="300px"
//             objectFit="cover"
//             borderRadius="full"
//           />
//           <EditIcon alignSelf="center" justifySelf="center" />
//         </Box>

//         <Box>
//           {info.map((element) => {
//             return (
//               element[0] !== "user_image" && (
//                 <Flex alignItems="center" key={v4()}>
//                   <FormLabel>
//                     {element[0] === "dob" ? "Date Of Birth" : element[0]}
//                   </FormLabel>
//                   <Editable
//                     textAlign="center"
//                     defaultValue={
//                       element[0] === "dob"
//                         ? element[1].slice(0, 10)
//                         : element[1]
//                     }
//                     fontSize="2xl"
//                     isPreviewFocusable={false}
//                   >
//                     <EditablePreview />

//                     {element[0] === "dob" && (
//                       <Input
//                         as={EditableInput}
//                         type="date"
//                         onChange={(e) => (element[1] = e.target.value)}
//                       />
//                     )}
//                     {element[0] === "email" && (
//                       <Input
//                         as={EditableInput}
//                         type="email"
//                         onChange={(e) => (element[1] = e.target.value)}
//                       />
//                     )}
//                     {element[0] !== "email" && element[0] !== "dob" && (
//                       <Input
//                         as={EditableInput}
//                         type="text"
//                         onChange={(e) => (element[1] = e.target.value)}
//                       />
//                     )}
//                     <EditableControls />
//                   </Editable>
//                 </Flex>
//               )
//             );
//           })}
//           <Button colorScheme="teal" variant="outline" onClick={submitChanges}>
//             Save
//           </Button>
//         </Box>
//       </Flex>
//     </>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import axios from "axios";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  IconButton,
  Image,
  Input,
  Grid,
  GridItem,
  useEditableControls,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

const API_LINK = process.env.REACT_APP_API_LINK;
const Profile = () => {
  const user_id = useSelector((state) => state.auth.userId);
  const [user_info, setUser_info] = useState({});
  const info = Object.entries(user_info);

  function EditableControls() {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      ""
    ) : (
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    );
  }

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    try {
      const data = await axios.get(`${API_LINK}/users/${user_id}`);
      setUser_info(data.data.result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const submitChanges = async () => {
    const data = Object.fromEntries(info);

    try {
      await axios.put(`${API_LINK}/users/${user_id}`, data);
      getMyInfo();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <Nav />
      <Box mt={{ base: "4", md: "0" }} mx="auto" maxW="container.lg">
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          <GridItem colSpan={{ base: 1, md: 1 }} textAlign="center">
            <Image
              src={user_info.user_image}
              boxSize={{ base: "150px", md: "250px" }}
              objectFit="cover"
              borderRadius="full"
              boxShadow="lg"
            />
            <EditIcon alignSelf="center" justifySelf="center" mt={2} />
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            {info.map((element) => {
              return (
                element[0] !== "user_image" && (
                  <Flex
                    alignItems="center"
                    key={v4()}
                    mb={{ base: "2", md: "4" }}
                  >
                    <FormLabel flex="1" fontWeight="bold">
                      {element[0] === "dob" ? "Date Of Birth" : element[0]}
                    </FormLabel>
                    <Editable
                      textAlign="center"
                      defaultValue={
                        element[0] === "dob"
                          ? element[1].slice(0, 10)
                          : element[1]
                      }
                      fontSize="lg"
                      isPreviewFocusable={false}
                      ml={2}
                    >
                      <EditablePreview />
                      {element[0] === "dob" && (
                        <Input
                          as={EditableInput}
                          type="date"
                          onChange={(e) => (element[1] = e.target.value)}
                        />
                      )}
                      {element[0] === "email" && (
                        <Input
                          as={EditableInput}
                          type="email"
                          onChange={(e) => (element[1] = e.target.value)}
                        />
                      )}
                      {element[0] !== "email" && element[0] !== "dob" && (
                        <Input
                          as={EditableInput}
                          type="text"
                          onChange={(e) => (element[1] = e.target.value)}
                        />
                      )}
                      <EditableControls />
                    </Editable>
                  </Flex>
                )
              );
            })}
            <Button
              mt={{ base: "4", md: "0" }}
              colorScheme="teal"
              variant="outline"
              onClick={submitChanges}
            >
              Save
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
