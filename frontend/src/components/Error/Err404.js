import React from "react";
import {
  VStack,
  Box,
  Heading,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Error404 = () => {
  const fontSize1 = useBreakpointValue({ base: "9rem", md: "15rem" });
  const fontSize2 = useBreakpointValue({ base: "2rem", md: "3rem" });
  const fontSize3 = useBreakpointValue({ base: "1rem", md: "1.5rem" });

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={4}
      textAlign="center"
      bgGradient="linear(to-b, gray.600, gray.900)"
      color="white"
      p={{ base: 4, md: 12 }}
    >
      <Heading fontSize={fontSize1} fontWeight="900" mb="0">
        404
      </Heading>
      <Heading fontSize={fontSize2} mt="0.5rem">
        Oops! Page not found
      </Heading>
      <Text fontSize={fontSize3} maxW="500px">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Text>
      <Link to="/">
        <Button colorScheme="whiteAlpha" textDecoration="none" fontWeight="600">
          Go back to homepage
        </Button>
      </Link>
    </VStack>
  );
};

export default Error404;
