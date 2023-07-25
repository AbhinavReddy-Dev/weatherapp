/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Container, Box, Text, Link } from "@chakra-ui/react";
import { Current, Forecast } from "../types";
import NavBar from "../components/NavBar";
interface PageLayoutProps {
  forecast?: Forecast;
  current?: Current;
  children: React.ReactNode;
}
const PageLayout = (props: PageLayoutProps) => {
  const is_day = props.current?.is_day;
  const is_moon_up = props.forecast?.astro?.is_moon_up;

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
          props.forecast?.astro
            ? is_day
              ? "linear(to-br, orange.100, blue.100)"
              : is_moon_up && !is_day
              ? "linear(to-bl, blackAlpha.500, blue.100)"
              : !is_moon_up && !is_day
              ? "linear(to-bl, gray.400, blue.500)"
              : ""
            : ""
        }></Box>
      <Box
        position={"fixed"}
        zIndex={-1}
        h={400}
        w={400}
        top={-100}
        right={is_moon_up && !is_day ? -100 : undefined}
        left={is_day ? -100 : undefined}
        borderRadius={"50%"}
        bg={
          is_day && props.current?.cloud && props.current.cloud <= 40
            ? "orange.200"
            : !is_day && is_moon_up
            ? "gray.300"
            : ""
        }></Box>
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
            title="Portfolio Link for Abhinav Reddy"
            target="_blank"
            href="https://www.abhinavreddy.dev/">
            Abhinav Reddy
          </Link>
        </Text>
        <Text fontSize={"x-small"} textColor={"gray.500"}>
          Powered by{" "}
          <Link
            textColor={"green.600"}
            target="_blank"
            href="https://www.weatherapi.com/"
            title="Free Weather API">
            WeatherAPI.com
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default PageLayout;
