import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { ActionInputProps } from "../types";

const ActionInput: React.FC<ActionInputProps> = ({
  placeholder,
  buttonLabel,
  handleOnClick,
  handleOnChange,
}) => {
  return (
    <Flex
      maxW={["90vw", "xl"]}
      gap={4}
      mt={14}
      mx={"auto"}
      flexDirection={["column", "row"]}>
      <Input
        placeholder={placeholder}
        focusBorderColor={"blue.300"}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <Button px={10} colorScheme="green" onClick={handleOnClick}>
        {buttonLabel}
      </Button>
    </Flex>
  );
};

export default ActionInput;
