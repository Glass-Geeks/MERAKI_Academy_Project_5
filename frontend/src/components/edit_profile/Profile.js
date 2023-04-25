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
  Stack,
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
    data.user_image = user_info.user_image;
    try {
      await axios.put(`${API_LINK}/users/${user_id}`, data);
      getMyInfo();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleFileUpload = async (e) => {
    const CLOUD_NAME = "dvgnuchjw";
    const UNSIGNED_UPLOAD_PRESET = "ym3yv62c";
    const FETCH_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

    const file = e.target.files[0];
    const DATA = new FormData();

    DATA.append("file", file);
    DATA.append("cloud_name", CLOUD_NAME);
    DATA.append("upload_preset", UNSIGNED_UPLOAD_PRESET);

    let res = await fetch(FETCH_URL, {
      method: "post",
      mode: "cors",
      body: DATA,
    });

    let json = await res.json();
    setUser_info({ ...user_info, user_image: json.url });
  };

  return (
    <>
      <Stack spacing="4">
        <Nav />
      </Stack>

      <Box mt="100" mx="auto" maxW="container.lg">
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          <GridItem colSpan={{ base: 1, md: 1 }} textAlign="center">
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              width="100%"
              pl="3"
            >
              <Image
                src={user_info.user_image}
                boxSize="300px"
                objectFit="cover"
                borderRadius="full"
              />
              <br />
              <Input
                type="file"
                id="update-profile-picture"
                onChange={handleFileUpload}
                display="none"
              />
              <label htmlFor="update-profile-picture">
                <Button as="span" colorScheme="blue" variant="outline">
                  Update Profile Picture
                </Button>
              </label>
            </Flex>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            {info.map((element) => {
              return (
                element[0] !== "user_image" && (
                  <Flex
                    pr="10"
                    pl="10"
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
            <Flex justifyContent="center">
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={submitChanges}
              >
                Save
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
