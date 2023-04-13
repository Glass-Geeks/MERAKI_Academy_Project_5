import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, VStack, HStack, Text, Button } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { SimpleGrid } from "@chakra-ui/layout";
import InfiniteScroll from "react-infinite-scroll-component";

const Tea_stu_card = ({ data }) => {
  const addFriend = () => {
    console.log("Hello Stranger");
  };

  return (
    <>
      <Box
        id="scrollableDiv"
        h="400px"
        w="500px"
        overflowY="auto"
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <InfiniteScroll
          dataLength={data.length}
          hasMore={false}
          loader={
            <Skeleton>
              <HStack>
                <Avatar />
                <Text>Name</Text>
              </HStack>
            </Skeleton>
          }
          scrollableTarget="scrollableDiv"
        >
          <VStack align="stretch" spacing={4}>
            {data.map((item) => (
              <HStack
                key={item.id}
                p="4"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack>
                  <Avatar src={item.user_image} />
                  <Text fontWeight="bold">
                    {`${item.first_name} ${item.last_name}`}
                  </Text>
                </HStack>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={addFriend}
                >
                  🔗 Connect
                </Button>
              </HStack>
            ))}
          </VStack>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default Tea_stu_card;
