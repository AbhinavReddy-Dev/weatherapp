/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useContext } from "react";
import ActionInput from "./ActionInput";
import axios from "axios";
import { GlobalDispatchContext } from "../state";
import "dotenv";
import { server_url } from "../config";
import { useToast } from "@chakra-ui/react";
const Signup = () => {
  const toast = useToast();
  const dispatch = useContext(GlobalDispatchContext);
  const [username, setUsername] = useState("");
  const handleLoginSignup = () => {
    if (username === "") {
      toast({
        title: "Enter username",
        description: "Please enter a username to login or signup",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (username.length < 3) {
      toast({
        title: "Username too short",
        description: "Please enter a username with at least 3 characters",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const config = {
      method: "post",
      url: `${server_url}user/create/`,
      data: JSON.stringify({
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
        dispatch({ type: "LOGIN_USER", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ActionInput
      placeholder="Enter username"
      buttonLabel="Login / Signup"
      handleOnChange={setUsername}
      handleOnClick={handleLoginSignup}
    />
  );
};

export default Signup;
