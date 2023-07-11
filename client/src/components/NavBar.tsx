import React, { useContext } from "react";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { User } from "../types";
import { GlobalDispatchContext } from "../state";
const NavBar = ({ isLoggedIn, user }: { isLoggedIn: boolean; user: User }) => {
  const dispatch = useContext(GlobalDispatchContext);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT_USER",
      payload: undefined,
    });
  };
  return (
    <Flex
      maxW={"90vw"}
      borderWidth={1}
      borderRadius={15}
      borderColor={"gray.200"}
      bg={"gray.100"}
      mt={5}
      mb={10}
      p={5}
      gap={5}
      mx={"auto"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      alignItems={"center"}>
      <Heading as={"h4"} fontSize={"2xl"} fontFamily={"mono"}>
        Weather App
      </Heading>
      {isLoggedIn && (
        <Flex alignItems={"center"} gap={5}>
          <Text fontSize={"medium"}>Welcome, {user?.username}</Text>
          <Button
            bg={"red.200"}
            fontSize={"small"}
            textColor={"red.800"}
            onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default NavBar;
