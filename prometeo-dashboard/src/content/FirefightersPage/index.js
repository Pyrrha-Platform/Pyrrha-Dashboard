import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FirefightersTable from './firefightersTable';
import AppContext from '../../context/app';

function FirefightersPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  if (currentUser.isAuth) {
    return <FirefightersTable />;
  } else {
    history.push('/login');
    return null;
  }
}

export default FirefightersPage;
