import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DashboardGrid from './dashboardGrid';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function DashboardPage() {
  const history = useHistory();

  const { currentUser } = useContext(AppContext);
  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <DashboardGrid />;
  } else {
    history.push('/login');
    return null;
  }

}

export default DashboardPage;
