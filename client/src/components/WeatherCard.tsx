/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";

import {
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Image,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Weather } from "../types";

const WeatherCard = ({ location, current, forecast }: Weather) => {
  const navigate = useNavigate();
  const handlePageNavigation = () => {
    navigate(`/${location?.name}`);
  };
  return (
    <Container
      maxW={"250px"}
      minH={"250px"}
      borderWidth={1}
      borderRadius={15}
      p={5}
      py={2}
      borderColor={"gray.200"}
      as={"button"}
      _hover={{ bg: "gray.100" }}
      onClick={handlePageNavigation}>
      <VStack spacing={5}>
        <HStack
          spacing={5}
          w={"100%"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"space-between"}>
          <Text fontSize={"5xl"} fontFamily={"mono"} textAlign={"start"}>
            {current?.temp_c.toFixed(0)}°C
          </Text>
          <Image
            textAlign={"end"}
            w={20}
            h={20}
            src={current?.condition.icon}
          />
        </HStack>
        <VStack spacing={1} w={"100%"} alignItems={"start"}>
          <Heading as={"h4"} fontSize={"xl"} fontFamily={"mono"}>
            {location?.name}
          </Heading>
          <Text fontSize={"medium"}>{location?.country}</Text>
        </VStack>
        <HStack
          alignItems={"normal"}
          justifyContent={"space-between"}
          w={"100%"}>
          <Text fontSize={"medium"} textAlign={"start"}>
            {forecast?.forecastday[0].day.daily_chance_of_rain}%
          </Text>
          <Text fontSize={"medium"} textAlign={"center"}>
            {current?.humidity}%
          </Text>
          <Text fontSize={"medium"} textAlign={"end"}>
            {current?.wind_kph}km/h
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
};

export default WeatherCard;
