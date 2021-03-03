import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsGrid from './detailsGrid';
import AppContext from '../../context/app';

function DetailsPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  let { device_id, increment, type } = useParams();

  /*
  if (currentUser.isAuth) {
    return (
      <DetailsGrid device_id={device_id} increment={increment} type={type} />
    );
  } else {
    history.push('/login');
    return null;
  }
  */
  return (
    <DetailsGrid device_id={device_id} increment={increment} type={type} />
  );
}

export default DetailsPage;
