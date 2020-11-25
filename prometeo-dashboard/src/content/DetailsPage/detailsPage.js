import React from "react";
import { useParams } from "react-router-dom";
import DetailsGrid from "./detailsGrid";

function DetailsPage() {
  let { firefighterId } = useParams();
  return <DetailsGrid firefighterId={firefighterId} />;
}

export default DetailsPage;
