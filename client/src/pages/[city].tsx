import React from "react";

import { useParams } from "react-router-dom";
import PageLayout from "../layout/page";

const City = () => {
  const { city } = useParams();
  return <PageLayout>City {city}</PageLayout>;
};

export default City;
