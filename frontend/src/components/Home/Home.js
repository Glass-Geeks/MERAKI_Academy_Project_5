import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Container,
  VStack,
} from "@chakra-ui/react";
import blob from "../blob.svg";

const HomePage = () => {
  return (
    <>
      <Container maxW="container.xl">
        <Flex
          direction={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="center"
          py={["8", null, "16"]}
        >
          <VStack spacing={6} alignItems="flex-start">
            <Heading as="h1" size="2xl">
              Welcome to Mate Finder
            </Heading>
            <Text fontSize="lg" lineHeight="tall">
              Once upon a time, in a world filled with innovation, a brilliant
              idea was born. This idea grew into the Amazing Website, where
              dreams come true and the impossible becomes reality. Our platform
              provides an unparalleled experience, engaging users with a
              captivating design and groundbreaking features. Join us on this
              incredible journey, and let the magic unfold.
            </Text>
          </VStack>
          <Box
            display={["none", null, "block"]}
            w={["100%", "80%", "40%"]}
            position="relative"
          >
            <Image
              src={blob}
              alt="blob graphic"
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="auto"
              zIndex="-1"
            />
            {/* Add other graphics or components here */}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default HomePage;
