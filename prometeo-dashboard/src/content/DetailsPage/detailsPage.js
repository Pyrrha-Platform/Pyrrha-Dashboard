import React from "react";
import { useParams } from "react-router-dom";
import PrometeoHeader from "../../components/PrometeoHeader";
import DetailsGrid from "./detailsGrid";

function DetailsPage() {
  let { id } = useParams();
  return (
    <>
      <PrometeoHeader />
      <DetailsGrid id={id} />
    </>
  );
}

export default DetailsPage;
