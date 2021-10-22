import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Map from './map';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function MapPage() {
  const history = useHistory();

  const { currentUser } = useContext(AppContext);
  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <Map />;
  } else {
    history.push('/login');
    return null;
  }
}

export default MapPage;
