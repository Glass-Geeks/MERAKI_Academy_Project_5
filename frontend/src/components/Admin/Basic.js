import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer, FiHome, FiMail, FiSettings } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import BasicCard from "./BasicCard";
import { Box, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";
const API_LINK = process.env.REACT_APP_API_LINK;

const Basic = () => {
  const [numbers, setNumbers] = useState({
    admins: "",
    rooms: "",
    schools: "",
    students: "",
    teachers: "",
    users: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { admins, rooms, schools, students, teachers, users } = numbers;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(`${API_LINK}/admin/numbers`);
      setIsLoading(false);
      setNumbers(data.data.result);
    } catch (error) {
      console.log("error :>> ", error);
    }
    console.log("API_LINK :>> ", API_LINK);
  };
  return (
    <>
      {isLoading ? (
        <Stack>
          <Skeleton height="15px" />
          <Skeleton height="15px" />
          <Skeleton height="15px" />
        </Stack>
      ) : (
        <Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <BasicCard
              title={"Users"}
              stat={users}
              icon={<BsPerson size={"3em"} />}
            />
            <BasicCard
              title={"Schools"}
              stat={schools}
              icon={<FiHome size={"3em"} />}
            />
            <BasicCard
              title={"Teachers"}
              stat={teachers}
              icon={<BsPerson size={"3em"} />}
            />
            <BasicCard
              title={"Students"}
              stat={students}
              icon={<BsPerson size={"3em"} />}
            />
            <BasicCard
              title={"Total chat rooms"}
              stat={rooms}
              icon={<FiMail size={"3em"} />}
            />
            <BasicCard
              title={"Total admin"}
              stat={admins}
              icon={<FiSettings size={"3em"} />}
            />
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default Basic;
