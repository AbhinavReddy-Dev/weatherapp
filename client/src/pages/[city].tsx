/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PageLayout from "../layout/page";
import { FiSunrise, FiSunset } from "react-icons/fi";
import {
  Breadcrumb,
  BreadcrumbItem,
  HStack,
  VStack,
  Text,
  Image,
  Heading,
  Container,
  Divider,
  Icon,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { Current, Forecast, Location } from "../types";
import ToggleCityButtonGroup from "../components/ToggleCityButtonGroup";

const City = () => {
  const {
    state: { location, current, forecast },
  } = useLocation() as {
    state: {
      location: Location;
      current: Current;
      forecast: { forecastday: Forecast[] };
    };
  };

  const [futureForecast, setFutureForecast] = useState([] as Forecast[]);

  useEffect(() => {
    if (forecast) {
      setFutureForecast(forecast.forecastday.slice(1));
    }
  }, [forecast]);

  return (
    <PageLayout forecast={forecast?.forecastday[0]} current={current}>
      {/* Breadcrumb navigation */}
      <HStack
        maxW={"md"}
        mx={"auto"}
        justifyContent={"space-between"}
        fontSize={"small"}
        fontWeight={"bold"}
        textColor={"gray.600"}>
        <Breadcrumb>
          <BreadcrumbItem>
            <NavLink to="/">Home</NavLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <NavLink to="#">{location.name}</NavLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <Container maxW={"md"} mt={10}>
        {/* Weather card data (location, current, forecast) */}
        <VStack spacing={5}>
          <VStack
            zIndex={2}
            position={["sticky", "relative"]}
            top={5}
            p={[5, 0]}
            borderRadius={15}
            backdropFilter={"blur(30px)"}
            spacing={1}
            w={"100%"}
            alignItems={"start"}>
            <Heading
              as={"h4"}
              textColor={"blue.800"}
              fontSize={"3xl"}
              fontFamily={"mono"}>
              {location?.name}
            </Heading>
            <Text fontSize={"small"} textColor={"gray.700"}>
              {location?.country}
            </Text>
          </VStack>
          <HStack
            spacing={5}
            w={"100%"}
            mb={10}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"space-between"}>
            <VStack alignItems={"flex-start"}>
              <Text
                textColor={"blue.900"}
                fontSize={"8xl"}
                fontWeight={"bold"}
                fontFamily={"mono"}
                display={"flex"}
                textAlign={"start"}>
                {current?.temp_c.toFixed(0)}
                <Text fontSize={"7xl"} fontWeight={"normal"}>
                  °C
                </Text>
              </Text>
              <Text
                fontSize={"sm"}
                fontFamily={"mono"}
                borderRadius={20}
                bg={"gray.200"}
                borderWidth={1}
                borderColor={"gray.300"}
                textColor={"gray.700"}
                px={3}
                py={1}
                textAlign={"center"}>
                {current?.condition.text}
              </Text>
            </VStack>
            <Image
              textAlign={"end"}
              w={40}
              h={40}
              overflow={"visible"}
              src={current?.condition.icon}
            />
          </HStack>

          <HStack
            alignItems={"normal"}
            justifyContent={"space-between"}
            w={"100%"}
            textColor={"gray.700"}
            fontSize={"lg"}
            fontWeight={"bold"}
            fontFamily={"monospace"}>
            <Text textAlign={"start"}>
              💧 {forecast?.forecastday[0].day.daily_chance_of_rain}%
            </Text>
            <Text textAlign={"center"}>🥵 {current?.humidity}%</Text>
            <Text textAlign={"end"}>💨 {current?.wind_kph}km/h</Text>
            <Text textAlign={"end"}>🧴 {current?.uv}UV</Text>
          </HStack>
        </VStack>

        <Divider my={10} borderWidth={1} borderColor={"gray.50"} />

        {/* Sunrise and Sunset (forecast, icons) */}
        <HStack justifyContent={"space-evenly"}>
          <VStack>
            <Icon color={"orange.600"} as={FiSunrise} h={10} w={10}></Icon>
            <Text
              fontFamily={"sans-serif"}
              fontWeight={"bold"}
              fontSize={"xs"}
              textColor={"gray.700"}>
              {forecast?.forecastday[0].astro.sunrise}
            </Text>
          </VStack>
          <VStack>
            <Icon color={"orange.600"} as={FiSunset} h={10} w={10}></Icon>
            <Text
              fontFamily={"sans-serif"}
              fontWeight={"bold"}
              fontSize={"xs"}
              textColor={"gray.700"}>
              {forecast?.forecastday[0].astro.sunset}
            </Text>
          </VStack>
        </HStack>

        <Divider my={10} borderWidth={1} borderColor={"gray.50"} />

        {/* Today's hourly weather (forecast) */}
        <Text
          textAlign={"left"}
          fontFamily={"sans-serif"}
          fontWeight={"semibold"}
          textColor={"gray.700"}>
          Today
        </Text>
        <HStack overflow={"scroll"} scrollSnapAlign={"end"}>
          {forecast?.forecastday[0].hour.map((hour) => (
            <VStack w={150} alignItems={"center"} gap={2} p={3} key={hour.time}>
              <Text
                w={"max-content"}
                fontSize={"small"}
                fontWeight={"semibold"}
                textColor={"blue.800"}>
                {new Date(hour.time)
                  .toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })
                  .slice(0, 5)}
              </Text>
              <Image w={10} h={10} src={hour.condition.icon} />
              <Text
                fontFamily={"mono"}
                textColor={"gray.700"}
                fontSize={"large"}
                fontWeight={"semibold"}>
                {hour.temp_c.toFixed(0)}°C
              </Text>
            </VStack>
          ))}
        </HStack>

        {/* Future forecast for 3 days (futureForecast) */}
        <VStack mt={5} mb={10} gap={5}>
          {futureForecast?.map((day) => (
            <SimpleGrid
              key={day.date}
              borderWidth={1}
              borderColor={"gray.100"}
              justifyContent={"space-between"}
              p={4}
              templateColumns={"1fr 1fr 1fr"}
              templateRows={"1fr"}
              borderRadius={15}
              fontFamily={"mono"}
              fontWeight={"bold"}
              alignContent={"center"}
              alignItems={"center"}
              justifyItems={"space-between"}
              w={"100%"}>
              <Flex w={"inherit"}>
                <Text textColor={"gray.800"}>
                  {new Date(day.date).toLocaleString("en-us", {
                    weekday: "long",
                  })}
                </Text>
              </Flex>
              <Image
                mx={5}
                w={10}
                h={10}
                overflow={"visible"}
                src={day.day.condition.icon}
              />
              <HStack justifyContent={"inherit"} w="inherit">
                <Text textColor={"gray.800"}>
                  {day.day.maxtemp_c.toFixed(0)}°C
                </Text>
                <Text textColor={"gray.600"}>
                  {day.day.mintemp_c.toFixed(0)}°C
                </Text>
              </HStack>
            </SimpleGrid>
          ))}
        </VStack>

        {/* Buttons to add or remove city (state, handleAddCity, handleRemoveCity) */}
        <ToggleCityButtonGroup />
      </Container>
    </PageLayout>
  );
};

export default City;
