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
  Text,
  Input,
  Select,
  FormControl,
  FormLabel,
  Switch,
  PopoverFooter,
  VStack,
  Stack,
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
              <Text> Your role is {role}</Text>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Would you like to sign in with a different role?
                </FormLabel>
                <Switch
                  id="email-alerts"
                  onChange={() => setIsChecked(!isChecked)}
                  isChecked={isChecked}
                />
              </FormControl>
            </VStack>
          </PopoverBody>
          <PopoverFooter>
            <Stack direction="row" justifyContent="flex-end">
              <Button>sign</Button>
            </Stack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SignWithSchool;
