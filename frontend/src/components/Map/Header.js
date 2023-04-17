// Header.js
import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box
      bg="blue.500"
      p={4}
      color="white"
      textAlign="center"
      borderRadius="md"
      mb={2}
      boxShadow="md"
    >
          <br />
      <br />
      <br />
  
      <Heading as="h1" mb={4} size="xl">
        Classmate Finder
      </Heading>
      <Text fontSize="lg">
        Connect with your old classmates from schools around the world.
      </Text>
      <Text mt={2}>
        To get started, click on a pin on the map to see the school details and
        then click "Go to school" to connect with classmates.
      </Text>
    </Box>
  );
}

