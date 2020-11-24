import React from "react";
import { useParams } from "react-router-dom";
import DetailsGrid from "./detailsGrid";

function DetailsPage() {
  let { id } = useParams();
  return <DetailsGrid id={id} />;
}

export default DetailsPage;
