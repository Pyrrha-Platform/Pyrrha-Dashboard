import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DashboardGrid from './dashboardGrid';
import AppContext from '../../context/app';

function DashboardPage() {
  const history = useHistory();

  /*
  const { currentUser } = useContext(AppContext);
  if (currentUser.isAuth) {
    return <DashboardGrid />;
  } else {
    history.push('/login');
    return null;
  }
  */
  return <DashboardGrid />;
}

export default DashboardPage;
