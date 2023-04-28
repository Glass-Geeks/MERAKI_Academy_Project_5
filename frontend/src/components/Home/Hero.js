import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  ScaleFade,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from './Logo.png';
const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreButtonClick = () => {
    navigate("/explore");
  };

  return (
    <Box
      h="100vh"
      bgImage="url('https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        w="100%"
        h="100%"
        bgGradient="linear(to-b, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <VStack spacing={4}>
            <ScaleFade initialScale={0.9} in={true}>
           
              <Image src={Logo}/>
            </ScaleFade>
            <Heading as="h1" size="3xl" color="white">
              Welcome to ClassMate Finder
            </Heading>
            <Text fontSize="2xl" color="white">
              Connect with classmates and grow your network
            </Text>
            <Button
              colorScheme="teal"
              onClick={handleExploreButtonClick}
              _hover={{ transform: "scale(1.05)" }}
              transition="all 0.2s"
            >
              Explore Schools
            </Button>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
};

export default HeroSection;
