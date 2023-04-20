// HowItWorks.js
import React from "react";
import {
  Box,
  Center,
  Container,
  Heading,
  VStack,
  Grid,
  Icon,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const HowItWorks = () => {
  const steps = [
    {
      title: "Step 1: Sign Up",
      description: "Create your account and set up your profile.",
    },
    {
      title: "Step 2: Search for Schools",
      description: "Enter your school name and find your classmates.",
    },
    {
      title: "Step 3: Connect with Classmates",
      description:
        "Send friend requests and start connecting with your classmates.",
    },
    {
      title: "Step 4: Interact & Collaborate",
      description:
        "Share study materials, discuss ideas, and collaborate on projects with your classmates.",
    },
  ];

  return (
    <Box bg="gray.100" py={8}>
      <Container maxW="container.xl">
        <Center mb={6}>
          <Heading as="h2" size="2xl">
            How It Works
          </Heading>
        </Center>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {steps.map((step, index) => (
            <VStack key={index} spacing={4} alignItems="center">
              <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" />
              <Heading as="h3" size="lg">
                {step.title}
              </Heading>
              <Text fontSize="md">{step.description}</Text>
            </VStack>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
