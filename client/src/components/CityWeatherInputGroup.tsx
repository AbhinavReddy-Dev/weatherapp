/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import ActionInput from "./ActionInput";
import { Weather, ComponentProps } from "../types";
import { GlobalStateContext } from "../state";
import { server_url } from "../config";
import axios from "axios";

const CityWeatherInputGroup = ({ allWeather }: { allWeather: Weather[] }) => {
  const state = useContext(GlobalStateContext) as ComponentProps;
  const toast = useToast();
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleCityWeather = () => {
    if (
      state.user.cities.find((cty) => cty.toLowerCase() === city.toLowerCase())
    ) {
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
        navigate(`/${encodeURI(res.data?.location.name)}`, {
          state: {
            location: res.data?.location,
            current: res.data?.current,
            forecast: res.data?.forecast,
          },
        });
      })
      .catch((err) => {
        toast({
          title: "City not found",
          description: "Please enter a valid city name",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <ActionInput
      placeholder="Enter city name"
      buttonLabel="Get weather"
      handleOnChange={setCity}
      handleOnClick={handleCityWeather}
    />
  );
};

export default CityWeatherInputGroup;
