import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Nav from "../Navbar/Nav";
const API_LINK = process.env.REACT_APP_API_LINK;

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    password: "",
    user_image: "",
    dob: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { email, first_name, last_name, role, password, user_image, dob } =
    userData;
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const processFile = async (e) => {
    const CLOUD_NAME = "dvgnuchjw";
    const UNSIGNED_UPLOAD_PRESET = "ym3yv62c";
    const FETCH_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

    const files = document.querySelector("[type=file]").files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
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
      setUserData({ ...userData, user_image: json.url });
      // console.log("url :>> ", JSON.stringify(json.url));
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userData;
    axios
      .post(`${API_LINK}/users/register`, user)
      .then((result) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Stack spacing="4">
        <Nav />
      </Stack>
      <Box
        w="100%"
        minH="100vh"
        bg="gray.100"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="85px"
      >
        <Box
          as="form"
          onSubmit={handleSubmit}
          w={["90%", "85%", "80%", "60%", "45%"]}
          maxW="800px"
          bg="white"
          borderRadius="md"
          p={[4, 6]}
          boxShadow="lg"
        >
          <VStack spacing={6}>
            <Heading as="h1" size="lg" textAlign="center">
              Sign Up
            </Heading>
            <FormControl id="first_name">
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleInputChange}
                placeholder="Enter First Name"
              />
            </FormControl>

            <FormControl id="last_name">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
              />
            </FormControl>

            <FormControl id="dob">
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                value={dob}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="user_image">
              <FormLabel>Your Image</FormLabel>
              <Input type="file" name="user_image" onChange={processFile} />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter Email"
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
            </FormControl>

            <FormControl id="role">
              <FormLabel>I am a?</FormLabel>
              <RadioGroup
                onChange={(value) => setUserData({ ...userData, role: value })}
                value={role}
              >
                <HStack spacing={6}>
                  <Radio value="TEACHER">Teacher</Radio>
                  <Radio value="STUDENT">Student</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              w="100%"
              colorScheme="blue"
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Register;
