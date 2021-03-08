import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FirefightersTable from './firefightersTable';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function FirefightersPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <FirefightersTable />;
  } else {
    history.push('/login');
    return null;
  }
}

export default FirefightersPage;
