/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useContext, useEffect, useState } from "react";
import PageLayout from "../layout/page";
import { useToast, Skeleton, Text } from "@chakra-ui/react";
import WeatherCardsLayout from "../layout/weathercards";
import WeatherCard from "../components/WeatherCard";
import axios from "axios";
import { Weather, ComponentProps } from "../types";
import { server_url } from "../config";
import { GlobalStateContext } from "../state";
import { ErrorBoundary } from "react-error-boundary";
import CurrentLocationWeatherCard from "../components/CurrentLocationWeatherCard";
import CityWeatherInputGroup from "../components/CityWeatherInputGroup";

const Index = () => {
  const state = useContext(GlobalStateContext) as ComponentProps;
  const toast = useToast();

  const [allWeather, setAllWeather] = useState([] as Weather[]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllWeather = () => {
    setIsLoading(() => true);

    const config = {
      method: "get",
      url: `${server_url}weather/${state.user._id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((res) => {
        setAllWeather(res.data);
      })
      .catch((err) => {
        setAllWeather([]);
        toast({
          title: "Error",
          description: "Unable to retrieve weather",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

    setIsLoading(() => false);
  };

  useEffect(() => {
    if (state.isLoggedIn && state.user.cities.length > 0) {
      fetchAllWeather();
    }
  }, [state]);

  return (
    <PageLayout>
      <CityWeatherInputGroup allWeather={allWeather} />
      <WeatherCardsLayout>
        <CurrentLocationWeatherCard />
        <ErrorBoundary
          fallback={
            <Text fontFamily={"mono"} fontSize={"sm"}>
              Could not load weather data, try again later.
            </Text>
          }>
          {!isLoading &&
            allWeather?.map((weather) => {
              const _weather: Weather = weather;
              return (
                <WeatherCard
                  location={_weather.location}
                  current={_weather.current}
                  forecast={_weather.forecast}
                  key={_weather.location.name}
                />
              );
            })}
        </ErrorBoundary>
      </WeatherCardsLayout>
    </PageLayout>
  );
};

export default Index;
