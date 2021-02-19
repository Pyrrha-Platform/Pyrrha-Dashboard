import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsGrid from './detailsGrid';

function DetailsPage() {
  let { firefighter_id, increment, type } = useParams();
  return (
    <DetailsGrid
      firefighter_id={firefighter_id}
      increment={increment}
      type={type}
    />
  );
}

export default DetailsPage;
