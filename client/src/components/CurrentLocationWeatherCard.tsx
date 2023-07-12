/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useContext, useState, useEffect } from "react";
import { GlobalStateContext } from "../state";
import { User, Weather } from "../types";
import axios from "axios";
import { server_url } from "../config";
import { useToast, Skeleton } from "@chakra-ui/react";
import WeatherCard from "../components/WeatherCard";
interface IndexProps {
  user: User;
  isLoggedIn: boolean;
}

const CurrentLocationWeatherCard = () => {
  const toast = useToast();
  const state = useContext(GlobalStateContext) as IndexProps;
  const [currentLocation, setCurrentLocation] = useState({} as Weather);
  const [isLoading, setIsLoading] = useState(false);

  const handleCurrentLocationWeather = () => {
    setIsLoading(true);
    function success(position: {
      coords: { latitude: number; longitude: number };
    }) {
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
          setCurrentLocation(res.data);
        })
        .catch((err) => {
          toast({
            title: "Location not found",
            description: "Unable to retrieve your location",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        });
      setIsLoading(false);
    }

    function error() {
      setIsLoading(false);
      toast({
        title: "Location not allowed",
        description: "Unable to retrieve your location",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    if (navigator.geolocation && state.isLoggedIn) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  useEffect(() => {
    handleCurrentLocationWeather();
  }, []);

  if (currentLocation.location)
    return (
      <Skeleton borderRadius={15} isLoaded={!isLoading}>
        <WeatherCard
          isCurrentLocation={true}
          location={currentLocation.location}
          current={currentLocation.current}
          forecast={currentLocation.forecast}
        />
      </Skeleton>
    );
  else return <></>;
};

export default CurrentLocationWeatherCard;
