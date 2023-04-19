import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Select,
  PopoverFooter,
  VStack,
  Stack,
  FormControl,
  FormLabel,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";
import { addStudent, addTeacher } from "../store/schools";
import axios from "axios";
const API_LINK = process.env.REACT_APP_API_LINK;
const SignWithSchool = () => {
  const yearsArray = [];
  for (let i = 1980; i <= 2023; i++) {
    yearsArray.push(i);
  }
  const toast = useToast();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [FromTo, setFromTo] = useState({ from: "", to: "" });
  const role = useSelector((state) => state.auth.role);
  const user_id = useSelector((state) => state.auth.userId);
  const { from, to } = FromTo;
  const { id } = useParams();
  const signUser = async () => {
    const data = {
      start_year: `1/1/${from}`,
      end_year: `1/1/${to}`,
      user_id,
    };
    if (to - from < 0) {
      return toast({
        title: "Error",
        description:
          "The years you ended your time in this school must be at least one year",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      const result = await axios.post(`${API_LINK}/users_schools/${id}`, {
        ...data,
      });
      if (role == "TEACHER") {
        dispatch(addTeacher(result.data.result[0]));
      } else {
        dispatch(addStudent(result.data.result[0]));
      }
      return toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" colorScheme="teal">
          Sign with school
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <br />
            <PopoverCloseButton />
          </PopoverHeader>
          <PopoverBody>
            <VStack spacing={4} align="stretch">
              <Select
                placeholder="From"
                onChange={(e) => setFromTo({ ...FromTo, from: e.target.value })}
                value={from}
              >
                {yearsArray.map((year) => (
                  <option key={v4()} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="To"
                onChange={(e) => setFromTo({ ...FromTo, to: e.target.value })}
                value={to}
              >
                {yearsArray.map((year) => (
                  <option key={v4()} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </VStack>
          </PopoverBody>
          <PopoverFooter>
            <Stack direction="row" justifyContent="flex-end">
              <Button onClick={signUser}>sign</Button>
            </Stack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SignWithSchool;
