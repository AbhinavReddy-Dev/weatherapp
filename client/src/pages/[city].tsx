import React, { useContext } from "react";

import { useParams, NavLink } from "react-router-dom";
import PageLayout from "../layout/page";
import axios from "axios";
import { server_url } from "../config";
import { GlobalDispatchContext } from "../state";
import { GlobalStateContext } from "../state";
import {
  useToast,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  HStack,
} from "@chakra-ui/react";

const City = () => {
  const toast = useToast();
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  const { city } = useParams() as { city: string };
  console.log(state);
  const handleAddCity = () => {
    const data = JSON.stringify({
      city,
    });

    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${server_url}user/add_city/${state.user._id}`,
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
      url: `${server_url}user/remove_city/${state.user._id}/${city}`,
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
    <PageLayout>
      <HStack justifyContent={"space-between"}>
        <Breadcrumb>
          <BreadcrumbItem>
            <NavLink to="/">Home</NavLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <NavLink to="#">{city}</NavLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {!state.user.cities.includes(city) ? (
          <Button
            bg={"blue.300"}
            textColor={"blue.800"}
            onClick={handleAddCity}>
            Add city +
          </Button>
        ) : (
          <Button
            onClick={handleRemoveCity}
            bg={"yellow.100"}
            textColor={"yellow.700"}>
            Remove city −
          </Button>
        )}
      </HStack>
    </PageLayout>
  );
};

export default City;
