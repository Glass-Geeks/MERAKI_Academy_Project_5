import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tea_stu_card from "./Tea_stu_card";
import axios from "axios";
import Nav from "../Navbar/Nav";
import {
  Box,
  VStack,
  Heading,
  Image,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

const API_LINK = process.env.REACT_APP_API_LINK;

const School = () => {
  const { id } = useParams();
  const [school, setSchool] = useState({});
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { establish_date, school_image, school_name } = school;

  useEffect(() => {
    getSchoolById();
  }, []);

  const getSchoolById = async () => {
    const data = await axios.get(`${API_LINK}/schools/${id}`);
    const stuData = await axios.get(`${API_LINK}/users_schools/stu/${id}`);
    const teacherData = await axios.get(
      `${API_LINK}/users_schools/teacher/${id}`
    );
console.log(teacherData)
    setSchool({ ...data.data.school[0] });
    setStudents(stuData.data.result);
    setTeachers(teacherData.data.result);
  };

  return (
    <>
      <Nav />
      <br />
      <br />
      <Container maxW="container.xl" pt="8">
        {Object.keys(school).length ? (
          <VStack spacing={4} alignItems="center">
            <Image
              src={
                "https://assets-global.website-files.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg"
              }
              alt="school"
              w="100%"
              h="auto"
              borderRadius="md"
              boxShadow="md"
            />
            <Heading>{school_name}</Heading>
          </VStack>
        ) : (
          <Heading>Loading</Heading>
        )}

        <SimpleGrid columns={[1, null, 2]} spacing={8} mt="8">
          <Box>
            <Heading size="md" mb="4">
              Students
            </Heading>
            <Tea_stu_card data={students} />
          </Box>
          <Box>
            <Heading size="md" mb="4">
              Teachers
            </Heading>
            <Tea_stu_card data={teachers} />
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default School;
