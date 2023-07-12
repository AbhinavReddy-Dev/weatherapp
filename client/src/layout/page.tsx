/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Container, Box, Text, Link } from "@chakra-ui/react";
import { Forecast } from "../types";
import NavBar from "../components/NavBar";
interface PageLayoutProps {
  forecast?: Forecast;
  children: React.ReactNode;
}
const PageLayout = (props: PageLayoutProps) => {
  // calculate if moon is up or sun is up

  function convertTimeToNumber(timeString: string) {
    const [time, period] = timeString.split(" ");
    const [_hours, _minutes] = time.split(":") as [string, string];

    let hours = parseInt(_hours, 10);
    const minutes = parseInt(_minutes, 10);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }
    const timeInNumber = hours * 100 + minutes;
    return timeInNumber;
  }

  // Get current time
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  // Convert hours and minutes to number format
  const currentTimeInNumber = hours * 100 + minutes;

  // Check if sunrise or sunset has passed
  const sunrise =
    convertTimeToNumber(props.forecast?.astro?.sunrise || "") <
      currentTimeInNumber &&
    currentTimeInNumber <
      convertTimeToNumber(props.forecast?.astro?.sunset || "");
  const is_moon_up = props.forecast?.astro?.is_moon_up;
  // const is_sun_up = props.forecast?.astro?.is_sun_up;

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
            ? sunrise
              ? "linear(to-br, orange.100, blue.100)"
              : is_moon_up && !sunrise
              ? "linear(to-bl, blackAlpha.500, blue.100)"
              : !is_moon_up && !sunrise
              ? "linear(to-bl, blue.300, blue.200)"
              : ""
            : ""
        }></Box>
      <Box
        position={"fixed"}
        zIndex={-1}
        h={400}
        w={400}
        top={-100}
        right={is_moon_up && !sunrise ? -100 : undefined}
        left={sunrise && !is_moon_up ? -100 : undefined}
        borderRadius={"50%"}
        bg={
          sunrise ? "orange.200" : !sunrise && is_moon_up ? "gray.300" : ""
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
