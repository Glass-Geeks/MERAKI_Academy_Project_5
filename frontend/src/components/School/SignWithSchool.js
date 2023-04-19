import React, { useState } from "react";
import {
  Box,
  Flex,
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
  Card,
  CardBody,
  Text,
  Input,
  Select,
  FormControl,
  FormLabel,
  Switch,
  PopoverFooter,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

const SignWithSchool = () => {
  const yearsArray = [];
  for (let i = 1980; i <= 2023; i++) {
    yearsArray.push(i);
  }
  const [isChecked, setIsChecked] = useState(false);
  const role = useSelector((state) => state.auth.role);
  console.log("role :>> ", isChecked);
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
          <PopoverCloseButton />
          <PopoverBody>
            <Flex gap="3" direction="column">
              <Select placeholder="From">
                {yearsArray.map((year) => (
                  <option key={v4()} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select placeholder="To">
                {yearsArray.map((year) => (
                  <option key={v4()} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </Flex>
            <Text> Your role is {role}</Text>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Would you like to sign in different role?
              </FormLabel>
              <Switch
                id="email-alerts"
                onChange={() => setIsChecked(!isChecked)}
                isChecked={isChecked}
              />
            </FormControl>
          </PopoverBody>
          <PopoverFooter alignSelf="flex-end">
            <Button>sign</Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SignWithSchool;
