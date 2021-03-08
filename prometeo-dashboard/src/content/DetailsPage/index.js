import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsGrid from './detailsGrid';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function DetailsPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  let { device_id, increment, type } = useParams();

  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return (
      <DetailsGrid device_id={device_id} increment={increment} type={type} />
    );
  } else {
    history.push('/login');
    return null;
  }

}

export default DetailsPage;
