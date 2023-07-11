import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface ActionInputProps {
  placeholder: string;
  buttonLabel: string;
  handleOnClick: () => void;
  handleOnChange: (value: string) => void;
}

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
      mb={10}
      mx={"auto"}
      flexDirection={["column", "row", "row"]}>
      <Input
        placeholder={placeholder}
        focusBorderColor={"blue.300"}
        onChange={(e) => handleOnChange(e.target.value)}
      />

      <Button
        px={10}
        textColor={"green.900"}
        bg={"green.300"}
        onClick={handleOnClick}>
        {buttonLabel}
      </Button>
    </Flex>
  );
};

export default ActionInput;
