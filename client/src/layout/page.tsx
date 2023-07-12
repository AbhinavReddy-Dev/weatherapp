import React from "react";
import { Container, Box, Text, Link } from "@chakra-ui/react";
import { Forecast } from "../types";
import NavBar from "../components/NavBar";
interface PageLayoutProps {
  forecast?: Forecast;
  children: React.ReactNode;
}
const PageLayout = (props: PageLayoutProps) => {
  const is_moon_up = props.forecast?.astro?.is_moon_up;
  const is_sun_up = props.forecast?.astro?.is_sun_up;
  return (
    <Container maxW={"1200px"} minH={"100vh"} p={5} pb={0}>
      <Box
        h={"full"}
        w={"full"}
        position={"fixed"}
        zIndex={-2}
        top={0}
        left={0}
        bgGradient={
          is_sun_up && !is_moon_up
            ? "linear(to-br, orange.100, blue.100)"
            : is_moon_up && !is_sun_up
            ? "linear(to-bl, blackAlpha.400, blue.100)"
            : ""
        }></Box>
      <Box
        position={"fixed"}
        zIndex={-1}
        h={400}
        w={400}
        top={-100}
        right={is_moon_up && !is_sun_up ? -100 : undefined}
        left={is_sun_up && !is_moon_up ? -100 : undefined}
        borderRadius={"50%"}
        bg={is_sun_up ? "orange.200" : is_moon_up ? "gray.300" : ""}></Box>
      <NavBar />
      {props.children}
      <Box
        mt={20}
        bg={"gray.100"}
        fontFamily={"mono"}
        fontSize={"xs"}
        fontWeight={"bold"}
        textColor={"gray.600"}
        borderRadius={15}
        py={2}
        mb={4}>
        <Text>
          <span>&copy; {new Date().getFullYear()}</span>
          <Link
            ml={2}
            title="GitHub Link for Abhinav Reddy"
            target="_blank"
            href="https://github.com/AbhinavReddy-Dev">
            Abhinav Reddy
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default PageLayout;
