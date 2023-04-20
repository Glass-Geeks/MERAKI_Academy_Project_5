
import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Image,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mousa",
      role: "Developer",
      imageUrl: "https://via.placeholder.com/150",
      bio: "Mousa is the CEO of the company and has been leading the team since its inception.",
    },
    {
      name: "Khalid",
      role: "Developer",
      imageUrl: "https://via.placeholder.com/150",
      bio: "Khalid is the CTO of the company and has been working on innovative technologies.",
    },
    {
      name: "Ahmad",
      role: "Developer",
      imageUrl: "https://via.placeholder.com/150",
      bio: "Ahmad is the CFO of the company and has been managing the company's finances.",
    },
  ];

  return (
    <Box py={8} bg="gray.100">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center">
          <Heading as="h2" size="2xl">
            About Us
          </Heading>
          <Text>// ...</Text>
          <Heading as="h3" size="xl">
            Meet Our Team
          </Heading>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={8}>
            {teamMembers.map((member, index) => (
              <GridItem key={index}>
                <VStack alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={member.imageUrl}
                    mb={4}
                  />
                  <Heading as="h4" size="md" mb={2}>
                    {member.name}
                  </Heading>
                  <Text fontSize="lg" mb={4}>
                    {member.role}
                  </Text>
                  <Text fontSize="md">{member.bio}</Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUs;