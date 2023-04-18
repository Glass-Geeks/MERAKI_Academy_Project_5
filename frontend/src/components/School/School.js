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
  const [friends, setFriends] = useState([]);
  const [requested, setRequested] = useState([]);
  const [received, setReceived] = useState([]);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    getSchoolById();
  }, []);

  const getSchoolById = async () => {
    try {
      const data = await axios.get(`${API_LINK}/schools/${id}`);
      console.log(data);
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
      const friend_arr = friendsData.data.result;
      const received_arr = receivedData.data.connection;
      const requested_arr = requestedData.data.connection;
      setSchool({ ...data.data.school[0] });
      setStudents(stuData.data.result);
      setTeachers(teacherData.data.result);
      setFriends(friend_arr.map((friend) => friend.friend_id));
      setRequested(requested_arr.map((received) => received.user_id));
      setReceived(received_arr.map((received) => received.user_id));
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
            <Tea_stu_card
              data={students}
              friends={friends}
              requested={requested}
              received={received}
              func={getSchoolById}

            />
          </Box>
          <Box>
            <Heading size="md" mb="4">
              Teachers
            </Heading>
            <Tea_stu_card
              data={teachers}
              friends={friends}
              requested={requested}
              received={received}
              func={getSchoolById}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default School;
