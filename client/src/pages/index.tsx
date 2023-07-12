/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../layout/page";
import { useToast, Skeleton } from "@chakra-ui/react";
import ActionInput from "../components/ActionInput";
import WeatherCardsLayout from "../layout/weathercards";
import WeatherCard from "../components/WeatherCard";
import axios from "axios";
import Signup from "../components/Signup";
import { User, Weather } from "../types";
import { server_url } from "../config";
import { GlobalStateContext } from "../state";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
interface IndexProps {
  user: User;
  isLoggedIn: boolean;
}

const Index = () => {
  const state = useContext(GlobalStateContext) as IndexProps;
  const toast = useToast();
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [allWeather, setAllWeather] = useState([] as Weather[]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({} as Weather);

  const handleCityWeather = () => {
    if (
      state.user.cities.find((cty) => cty.toLowerCase() === city.toLowerCase())
    ) {
      console.log(
        allWeather.find(
          (weather) =>
            weather.location.name.toLowerCase() === city.toLowerCase()
        )
      );
      const weather = allWeather.find(
        (weather) => weather.location.name.toLowerCase() === city.toLowerCase()
      ) as Weather;
      navigate(`/${weather?.location.name}`, {
        state: {
          location: weather.location,
          current: weather.current,
          forecast: weather.forecast,
        },
      });
      return;
    }
    const config = {
      method: "get",
      url: `${server_url}weather/search/${state.user._id}/${city}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
        navigate(`/${encodeURI(res.data?.location.name)}`, {
          state: {
            location: res.data?.location,
            current: res.data?.current,
            forecast: res.data?.forecast,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "City not found",
          description: "Please enter a valid city name",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    console.log(state);

    if (navigator.geolocation && state.isLoggedIn) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    if (state.isLoggedIn && state.user.cities.length > 0) {
      setIsLoading(true);

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
          console.log(res);
          setAllWeather(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setAllWeather([]);
          setIsLoading(false);
          toast({
            title: "Error",
            description: "Unable to retrieve weather",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [state]);

  function success(position: { coords: { latitude: any; longitude: any } }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const config = {
      method: "get",
      url: `${server_url}weather/search/${state.user._id}/${latitude}/${longitude}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
        setCurrentLocation(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Location not found",
          description: "Unable to retrieve your location",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  function error() {
    toast({
      title: "Location not allowed",
      description: "Unable to retrieve your location",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <PageLayout>
      {state.isLoggedIn ? (
        <>
          <ActionInput
            placeholder="Enter city name"
            buttonLabel="Get weather"
            handleOnChange={setCity}
            handleOnClick={handleCityWeather}
          />

          <WeatherCardsLayout>
            {currentLocation.location && (
              <Skeleton borderRadius={15} isLoaded={!isLoading}>
                <WeatherCard
                  isCurrentLocation={true}
                  location={currentLocation.location}
                  current={currentLocation.current}
                  forecast={currentLocation.forecast}
                />
              </Skeleton>
            )}
            <ErrorBoundary fallback={<div>Could not load weather</div>}>
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
        </>
      ) : (
        <Signup />
      )}
    </PageLayout>
  );
};

export default Index;
