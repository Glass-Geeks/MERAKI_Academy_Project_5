import React from "react";
import {
  Box,
  Center,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const Features = () => {
  const features = [
    {
      icon: "🔍",
      title: "Find Classmates",
      description: "Search and connect with classmates from your school or classes.",
    },
    {
      icon: "🎓",
      title: "Alumni Network",
      description: "Stay in touch with alumni and expand your professional network.",
    },
    {
      icon: "📚",
      title: "Study Groups",
      description: "Join or create study groups in order to collaborate and learn together.",
    },
    {
      icon: "🎉",
      title: "Events",
      description: "Attend events organized by your school or fellow classmates.",
    },
  ];

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Center mb={6}>
          <Heading as="h2" size="2xl">
            Key Features
          </Heading>
        </Center>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, index) => (
            <VStack key={index} spacing={4} alignItems="center">
              <Text fontSize="3xl">{feature.icon}</Text>
              <Heading as="h3" size="lg">
                {feature.title}
              </Heading>
              <Text fontSize="md" textAlign="center">
                {feature.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
