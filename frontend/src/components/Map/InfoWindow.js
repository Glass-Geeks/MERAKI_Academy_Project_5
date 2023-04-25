import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const InfoWindow = ({ school, fixed, setPinClicked }) => {
  const navigate = useNavigate();

  return (
    <Box
      className="infoPopup"
      p="4"
      backgroundColor="white"
      borderRadius="md"
      boxShadow="md"
      position={fixed ? "fixed" : "absolute"}
      top={fixed ? "50%" : ""}
      left={fixed ? "50%" : ""}
      transform={fixed ? "translate(-50%, -50%)" : ""}
      zIndex="1000" 
    >
      <h3 style={{ textAlign: "center", fontSize: "20px" }}>
        {school.school_name}
      </h3>
      <img
        className="schoolMapIMG"
        src={
          school.school_image === "none"
            ? "https://images.unsplash.com/photo-1543505298-b8be9b52a21a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            : school.school_image
        }
        alt={school.school_name}
      />
      <Button
        colorScheme="blue"
        mt="2"
        onClick={() => navigate(`/school/${school.school_id}`)}
      >
        Go to school
      </Button>
      <Button colorScheme="gray" mt="2" onClick={() => setPinClicked(false)}>
        Close
      </Button>
    </Box>
  );
};

export default InfoWindow;