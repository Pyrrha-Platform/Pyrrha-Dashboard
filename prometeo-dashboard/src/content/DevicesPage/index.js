import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DevicesTable from './devicesTable';
import AppContext from '../../context/app';

function DevicesPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  if (currentUser.isAuth) {
    return <DevicesTable />;
  } else {
    history.push('/login');
    return null;
  }
}

export default DevicesPage;
