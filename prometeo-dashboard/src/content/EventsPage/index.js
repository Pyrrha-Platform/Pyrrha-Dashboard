import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import EventsTable from './eventsTable';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function EventsPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <EventsTable />;
  } else {
    history.push('/login');
    return null;
  }
}

export default EventsPage;
