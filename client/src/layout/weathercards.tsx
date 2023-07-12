import React, { PropsWithChildren } from "react";

import { Grid } from "@chakra-ui/react";

const WeatherCardsLayout = ({ children }: PropsWithChildren) => {
  return (
    <Grid
      w={["", "xl"]}
      mx={"auto"}
      mt={16}
      maxW={"90vw"}
      templateColumns={["1fr", "repeat(2, 1fr)"]}
      gap={10}>
      {children}
    </Grid>
  );
};

export default WeatherCardsLayout;
