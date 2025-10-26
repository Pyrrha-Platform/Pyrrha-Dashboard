import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirefightersTable from './firefightersTable';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';
import './_firefighters-page.scss';

function FirefightersPage(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <FirefightersTable />;
  } else {
    navigate('/login');
    return null;
  }
}

export default FirefightersPage;
