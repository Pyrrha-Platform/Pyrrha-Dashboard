import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardGrid from './dashboardGrid';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';
import PyrrhaHeader from '../../components/PyrrhaHeader';

function DashboardPage(props) {
  const navigate = useNavigate();
  const active = props.active;
  const language = props.language;
  const page = props.page;
  const setActive = props.setActive;
  const setPage = props.setPage;

  const { currentUser } = useContext(AppContext);
  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return (
      <>
        <PyrrhaHeader
          active={active}
          page={page}
          setActive={setActive}
          setPage={setPage}
        />
        <DashboardGrid />
      </>
    );
  } else {
    navigate('/login');
    return null;
  }
}

export default DashboardPage;
