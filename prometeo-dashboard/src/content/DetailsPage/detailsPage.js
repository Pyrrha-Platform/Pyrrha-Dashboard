import React from "react";
import { useParams } from "react-router-dom";
import DetailsGrid from "./detailsGrid";

function DetailsPage() {
  let { firefighterId, increment } = useParams();
  return <DetailsGrid firefighterId={firefighterId} increment={increment} />;
}

export default DetailsPage;
