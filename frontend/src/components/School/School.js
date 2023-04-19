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
  Flex,
  Button,
} from "@chakra-ui/react";
import {
  setFriends,
  addFriend,
  removeFriend,
  setRequested,
  addRequested,
  removeRequested,
  setReceived,
  addReceived,
  removeReceived,
} from "../store/Connection";
import { useDispatch, useSelector } from "react-redux";
import SignWithSchool from "./SignWithSchool";
const API_LINK = process.env.REACT_APP_API_LINK;

const School = () => {
  const { id } = useParams();
  const [school, setSchool] = useState({});
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { establish_date, school_image, school_name } = school;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    getSchoolById();
  }, []);

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
      setStudents(stuData.data.result);
      setTeachers(teacherData.data.result);
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
              src={school_image}
              alt="school"
              w="100%"
              h="auto"
              borderRadius="md"
              boxShadow="md"
            />
            <Flex justifyContent='space-between' gap={'40vw'} alignItems='center'>
              <Heading alignSelf="flex-start">{school_name}</Heading>
              <SignWithSchool/>
            </Flex>
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
