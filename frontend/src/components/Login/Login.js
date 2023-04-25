import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setLogin,
  setUserId,
  setLogout,
  setUserName,
  setRole
} from "../store/auth/index";
import axios from "axios";
import Nav from "../Navbar/Nav";

const API_LINK = process.env.REACT_APP_API_LINK;

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await axios.post(`${API_LINK}/users/login`, userData);

      if (result.data) {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setRole(result.data.role));
        dispatch(setUserName(result.data.first_name));

        navigate("/explore");
      } else {
        throw Error;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Error happened while Login, please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Nav/>
    <br></br>
    <br></br>
    <br></br>
    <Box maxW="md" mx="auto"  >
      <Heading as="h2" textAlign="center" mb="8">
        Login
      </Heading>
      <Box
        bg="white"
        px={{ base: "4", md: "10" }}
        py={{ base: "6", md: "12" }}
        shadow="base"
        rounded={{ sm: "md" }}
      >
        <form onSubmit={login}>
          <FormControl id="email" isRequired mb="6">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="password" isRequired mb="6">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
            w="full"
            mb="6"
          >
            Login
          </Button>
        </form>

        {error && (
          <Text color="red.500" mt="4" textAlign="center">
            {error}
          </Text>
        )}
      </Box>
    </Box>
    </>
  );
};

export default Login;


