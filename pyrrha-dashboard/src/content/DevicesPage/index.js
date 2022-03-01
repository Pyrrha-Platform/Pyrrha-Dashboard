import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DevicesTable from './devicesTable';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function DevicesPage(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return (
      <>
        <DevicesTable />
      </>
    );
  } else {
    navigate('/login');
    return null;
  }
}

export default DevicesPage;
