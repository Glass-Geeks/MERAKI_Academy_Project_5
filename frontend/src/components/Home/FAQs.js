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
        'To create an account, click the "Sign Up" button on the top right corner of the website and fill in the required information.',
    },
    {
      question: "How do I find my classmates?",
      answer:
        "After logging in, you can search for your school and classes using the search bar. Once you find your school or class, you can connect with your classmates by sending them friend requests.",
    },
    {
      question: "Can I join multiple schools or classes?",
      answer:
        "Yes, you can join multiple schools or classes by searching for them and connecting with the respective classmates.",
    },
    {
      question: "How do I create a study group?",
      answer:
        'To create a study group, navigate to the "Study Groups" section, click on "Create a Study Group" and fill in the required information.',
    },
    {
      question: "How do I attend events?",
      answer:
        'You can find a list of upcoming events in the "Events" section of the website. To attend an event, simply click on the "Attend" button next to the event.',
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