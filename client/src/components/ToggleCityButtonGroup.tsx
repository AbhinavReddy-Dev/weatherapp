/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useContext } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { GlobalStateContext, GlobalDispatchContext } from "../state";
import axios from "axios";
import { server_url } from "../config";
import { useParams } from "react-router-dom";

const ToggleCityButtonGroup = () => {
  const toast = useToast();
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const { city } = useParams() as { city: string };

  const handleAddCity = () => {
    const data = JSON.stringify({
      city,
    });
    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${server_url}user/add_city/${state.user ? state.user._id : ""}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast({
          title: "City added!",
          description: "City added to your weather list.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch({
          type: "ADD_CITY",
          payload: city,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "City not added! Try again.",
          description: "Error adding city to your weather list.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleRemoveCity = () => {
    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${server_url}user/remove_city/${
        state.user ? state.user._id : ""
      }/${city}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast({
          title: "City removed!",
          description: "City removed from your weather list.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch({
          type: "REMOVE_CITY",
          payload: city,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "City not removed! Try again.",
          description: "Error removing city from your weather list.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      {!state.user?.cities.includes(city) ? (
        <Button
          w={"100%"}
          fontSize={"small"}
          bg={"blue.300"}
          textColor={"blue.800"}
          onClick={handleAddCity}>
          Add city
        </Button>
      ) : (
        <Button
          w={"100%"}
          fontSize={"small"}
          bg={"yellow.50"}
          textColor={"yellow.700"}
          onClick={handleRemoveCity}>
          Remove city
        </Button>
      )}
    </>
  );
};

export default ToggleCityButtonGroup;
