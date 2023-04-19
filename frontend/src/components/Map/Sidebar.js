// SchoolSidebar.js
import React from "react";
import { Box, Text, Image, Input, VStack } from "@chakra-ui/react";

const Sidebar = ({ pins, handleClick, searchInput, setSearchInput }) => {
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <VStack
      w={{ base: "100%", md: "350px" }}
      h={{ base: "auto", md: "100vh" }}
      bg="white"
      p="4"
      spacing="4"
      divider={<Box border="1px" borderColor="gray.300" w="100%" />}
      overflowY="auto"
    >
      <Input
        placeholder="Search for schools"
        value={searchInput}
        onChange={handleSearchInputChange}
        bg="white"
        borderRadius="md"
        boxShadow="sm"
        mb={4}
        _placeholder={{ color: "gray.400" }}
        _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
      />

      {pins
        .filter((pin) =>
          pin.school.school_name
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        )
        .map((pin) => (
          <Box
            className="sidebarBox"
            w="100%"
            key={pin.school.school_id}
            onClick={() => handleClick(pin, true)}
            cursor="pointer"
          >
            <Image
              className="sidebarIMG"
              src={pin.school.school_image}
              alt={pin.school.school_name}
              width="100px"
              height="100px"
              objectFit="cover"
            />
            <Text fontSize="lg" fontWeight="bold">
              {pin.school.school_name}
            </Text>
          </Box>
        ))}
    </VStack>
  );
};

export default Sidebar;
