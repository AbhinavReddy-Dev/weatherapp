import React from "react";
import { Container } from "@chakra-ui/react";
interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = (props: PageLayoutProps) => {
  return (
    <Container maxW={"1200px"} minH={"100vh"}>
      {props.children}
    </Container>
  );
};

export default PageLayout;
