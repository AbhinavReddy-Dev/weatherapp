/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import PageLayout from "../layout/page";
import { Flex, Spacer, Input, Button, useToast } from "@chakra-ui/react";
import ActionInput from "../components/ActionInput";
import WeatherCardsLayout from "../layout/weathercards";
import WeatherCard from "../components/WeatherCard";
import axios from "axios";
import Signup from "../components/Signup";
import { User, Weather } from "../types";
import { server_url } from "../config";
import { GlobalDispatchContext } from "../state";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
interface IndexProps {
  user: User;
  isLoggedIn: boolean;
}

const Index = (state: IndexProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useContext(GlobalDispatchContext);
  const [city, setCity] = useState("");
  const [allWeather, setAllWeather] = useState([] as Weather[]);

  const handleCityWeather = () => {
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
          state: { weather: res.data },
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
    if (state.isLoggedIn && state.user.cities.length > 0) {
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
        })
        .catch((err) => {
          console.log(err);
          setAllWeather([]);
        });
    }
  }, [state.isLoggedIn]);

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
            <ErrorBoundary fallback={<div>Could not load weather</div>}>
              {allWeather?.map((weather) => {
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
