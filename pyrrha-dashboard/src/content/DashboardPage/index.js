import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardGrid from './dashboardGrid';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';
import './_dashboard-page.scss';

function DashboardPage(props) {
  const navigate = useNavigate();

  const { currentUser } = useContext(AppContext);
  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <DashboardGrid />;
  } else {
    navigate('/login');
    return null;
  }
}

export default DashboardPage;
