import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import DetailsGrid from "./detailsGrid";

function DetailsPage() {
  let { id } = useParams();
  return (
    <div>
      <Header />
      <DetailsGrid id={id} />
    </div>
  );
}

export default DetailsPage;
