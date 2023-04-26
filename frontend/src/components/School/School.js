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
  Flex,
  Badge,
  Input,
} from "@chakra-ui/react";
import { setFriends, setRequested, setReceived } from "../store/Connection";
import { useDispatch, useSelector } from "react-redux";
import SignWithSchool from "./SignWithSchool";
import { setStudent, setTeacher } from "../store/schools";
const API_LINK = process.env.REACT_APP_API_LINK;

const School = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [school, setSchool] = useState({});

  const students = useSelector((state) => state.schools.students);

  const teachers = useSelector((state) => state.schools.teachers);

  const { school_image, school_name } = school;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    getSchoolById();
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) =>
        `${student.first_name} ${student.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
    setFilteredTeachers(
      teachers.filter((teacher) =>
        `${teacher.first_name} ${teacher.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, students, teachers]);

  const getSchoolById = async () => {
    try {
      const data = await axios.get(`${API_LINK}/schools/${id}`);

      const stuData = await axios.get(`${API_LINK}/users_schools/stu/${id}`);
      const teacherData = await axios.get(
        `${API_LINK}/users_schools/teacher/${id}`
      );
      const friendsData = await axios.get(
        `${API_LINK}/users_schools/friends/${userId}`
      );
      const receivedData = await axios.get(
        `${API_LINK}/friends/requests/${userId}`
      );
      const requestedData = await axios.get(
        `${API_LINK}/friends/requests/forUser/${userId}`
      );
      const friend_arr = friendsData.data.result.map(
        (friend) => friend.friend_id
      );
      const received_arr = receivedData.data.connection.map(
        (received) => received.user_id
      );
      const requested_arr = requestedData.data.connection.map(
        (received) => received.user_id
      );
      setSchool({ ...data.data.school[0] });
      dispatch(setStudent(stuData.data.result));
      dispatch(setTeacher(teacherData.data.result));
      dispatch(setFriends(friend_arr));
      dispatch(setRequested(requested_arr));
      dispatch(setReceived(received_arr));
    } catch (err) {
      console.log(err);
    }
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
                school_image === "none"
                  ? "https://images.unsplash.com/photo-1543505298-b8be9b52a21a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  : school_image
              }
              alt="school"
              w="100%"
              h="auto"
              borderRadius="md"
              boxShadow="md"
            />

            <Flex
              justifyContent="space-between"
              gap={"40vw"}
              alignItems="center"
            >
              <Heading alignSelf="flex-start">{school_name}</Heading>
              <SignWithSchool />
            </Flex>
          </VStack>
        ) : (
          <Heading>Loading</Heading>
        )}
        <Box
          mt={{ base: 4, md: 8 }}
          mx="auto"
          maxW={{ base: "90%", md: "50%", lg: "40%" }}
        >
          <Input
            placeholder="Search students and teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems={{ base: "center", md: "flex-start" }}
          mt="8"
        >
          <Box flex="1" mx={{ base: 0, md: 4 }}>
            <Badge
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              colorScheme="teal"
              p="2"
              m="2"
              borderRadius="md"
            >
              Students
            </Badge>
            <Tea_stu_card data={filteredStudents} />
          </Box>
          <br />
          <Box flex="1" mx={{ base: 0, md: 4 }}>
            <Badge
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              colorScheme="teal"
              p="2"
              m="2"
              borderRadius="md"
            >
              Teachers
            </Badge>
            <Tea_stu_card data={filteredTeachers} />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default School;
