/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Weather } from "../types";

interface WeatherCardProps {
  location: Weather["location"];
  current: Weather["current"];
  forecast: Weather["forecast"];
  isCurrentLocation?: boolean;
}

const WeatherCard = ({
  location,
  current,
  forecast,
  isCurrentLocation = false,
}: WeatherCardProps) => {
  const navigate = useNavigate();
  const handlePageNavigation = () => {
    navigate(`/${location?.name}`, { state: { location, current, forecast } });
  };
  return (
    <Container
      maxW={"350px"}
      minH={"250px"}
      borderWidth={1}
      borderRadius={15}
      shadow={"sm"}
      p={5}
      py={2}
      bgGradient={`linear(to-tr, gray.50, ${
        current.is_day ? "orange.50" : "blue.50"
      })`}
      borderColor={"gray.200"}
      as={"button"}
      position={"relative"}
      _hover={{ bg: "gray.100" }}
      onClick={handlePageNavigation}>
      {isCurrentLocation && (
        <Text
          position={"absolute"}
          top={-6}
          borderTopRadius={15}
          borderWidth={1}
          borderColor={"gray.200"}
          bg={"teal.50"}
          fontSize={"xs"}
          fontWeight={"bold"}
          fontFamily={"mono"}
          p={1}
          px={3}
          zIndex={-1}
          left={5}
          textColor={"gray.500"}>
          Current Location
        </Text>
      )}
      <VStack spacing={3}>
        <HStack
          spacing={5}
          w={"100%"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"space-between"}>
          <Text
            fontSize={"5xl"}
            fontFamily={"mono"}
            fontWeight={"bold"}
            textColor={"blue.900"}
            textAlign={"start"}>
            {current?.temp_c.toFixed(0)}°C
          </Text>
          <Image
            textAlign={"end"}
            w={20}
            h={20}
            overflow={"visible"}
            src={current?.condition.icon}
          />
        </HStack>
        <VStack spacing={1} mb={3} w={"100%"} alignItems={"start"}>
          <Heading
            as={"h4"}
            fontSize={"xl"}
            fontFamily={"mono"}
            textColor={"blue.800"}>
            {location?.name}
          </Heading>
          <Text fontSize={"xs"} textColor={"gray.500"}>
            {location?.country}
          </Text>
        </VStack>
        <HStack
          alignItems={"normal"}
          justifyContent={"space-between"}
          w={"100%"}
          textColor={"gray.500"}
          fontSize={"sm"}
          fontWeight={"bold"}
          fontFamily={"monospace"}>
          <Text textAlign={"start"}>
            💧 {forecast?.forecastday[0].day.daily_chance_of_rain}%
          </Text>
          <Text textAlign={"start"}>🥵 {current?.humidity}%</Text>
          <Text textAlign={"start"}>💨 {current?.wind_kph}km/h</Text>
          <Text textAlign={"start"}>🧴{current?.uv}UV</Text>
        </HStack>
      </VStack>
    </Container>
  );
};

export default WeatherCard;
