import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";

const FAQs = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        'To create an account, click the "Register" button on the top right corner of the website after you press "Explore Schools" and fill in the required information.',
    },
    {
      question: "How do find my school?",
      answer:
        'To search for a  school, click on any pin the map or search for your school in the search bar in the left bar.',
    },
    {
      question: "How do I find my classmates?",
      answer:
        "After logging in, you can search for your school and classes using the search bar. Once you find your school or class, you can connect with your classmates by sending them friend requests or you can search for suggested friends in the friends button.",
    },
    {
      question: "Can I join multiple schools or classes?",
      answer:
        "Yes, you can join multiple schools or classes by searching for them and connecting with the respective classmates.",
    },
    {
      question: "How I can contact with my mates?",
      answer:
        "You can message your friends by press the messages button and press message next to your friend name.",
    },
    
  ];

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Heading as="h2" size="2xl" mb={6} textAlign="center">
          Frequently Asked Questions
        </Heading>
        <Accordion allowToggle>
          {faqs.map((faq, index) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize={["md", "lg"]}>{faq.question}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text fontSize={["sm", "md"]}>{faq.answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};

export default FAQs;