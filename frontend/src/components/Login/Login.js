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

        navigate("/");
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
    <Box maxW="md" mx="auto" mt="85">
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
  );
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setLogin,
//   setUserId,
//   setLogout,
//   setUserName,
//   setRole
// } from "../store/auth/index";
// import axios from "axios";
// const API_LINK = process.env.REACT_APP_API_LINK;

// const Login = () => {
//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(false);
//   const dispatch = useDispatch();



//   const login = async (e) => {
//     e.preventDefault();
//     const user = userData;
//     try {
//       const result = await axios.post(`${API_LINK}/users/login`, user);
//       if (result.data) {
//         console.log("result.data :>> ", result.data);
//         setMessage("");
//         dispatch(setLogin(result.data.token));
//         dispatch(setUserId(result.data.userId));
//         dispatch(setRole(result.data.role));
//         dispatch(setUserName(result.data.first_name));

//         navigate("/");
//       } else throw Error;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return setMessage(error.response.data.message);
//       }
//       setMessage("Error happened while Login, please try again");
//     }
//   };

//   return (
//     <>
//       <div className="Form">
//         <p className="Title">Login:</p>
//         <form onSubmit={login}>
//           <br />

//           <input
//             type="email"
//             placeholder="Email"
//             onChange={(e) =>
//               setUserData({ ...userData, email: e.target.value })
//             }
//           />
//           <br />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) =>
//               setUserData({ ...userData, password: e.target.value })
//             }
//           />
//           <br />
//           <button
//             onClick={(e) => {
//               login(e);
//             }}
//           >
//             Login
//           </button>
//         </form>

//         {status
//           ? message && <div className="SuccessMessage">{message}</div>
//           : message && <div className="ErrorMessage">{message}</div>}
//       </div>
//     </>
//   );
// };

// export default Login;
