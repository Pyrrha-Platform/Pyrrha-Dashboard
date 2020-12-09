import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsGrid from './detailsGrid';

function DetailsPage() {
  let { firefighterId, increment, type } = useParams();
  return (
    <DetailsGrid
      firefighterId={firefighterId}
      increment={increment}
      type={type}
    />
  );
}

export default DetailsPage;
