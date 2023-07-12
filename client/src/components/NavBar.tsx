/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useContext } from "react";
import { Flex, Heading, Button, Text, Icon } from "@chakra-ui/react";
import { GlobalDispatchContext } from "../state";
import { GlobalStateContext } from "../state";
import { AiOutlineLogout } from "react-icons/ai";
const NavBar = () => {
  const { isLoggedIn, user } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT_USER",
    });
  };

  return (
    <Flex
      maxW={"90vw"}
      borderWidth={1}
      borderRadius={15}
      borderColor={"gray.200"}
      bgGradient={"linear(to-tr, yellow.50, purple.50)"}
      mb={10}
      p={5}
      gap={5}
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}>
      <Heading as={"h4"} fontSize={["lg", "2xl"]} fontFamily={"mono"}>
        Weather App
      </Heading>
      {isLoggedIn && (
        <Flex alignItems={"center"} gap={5}>
          <Text fontSize={["small", "medium"]} textColor={"gray.800"}>
            Hi, {user?.username}!
          </Text>
          <Button
            borderRadius={50}
            bg={"red.200"}
            fontSize={["xl", "2xl"]}
            p={[0, 2]}
            textColor={"red.800"}
            onClick={handleLogout}>
            <Icon as={AiOutlineLogout} />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default NavBar;
