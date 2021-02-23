import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import EventsTable from './eventsTable';
import AppContext from '../../context/app';

function EventsPage() {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  if (currentUser.isAuth) {
    return <EventsTable />;
  } else {
    history.push('/login');
    return null;
  }
}

export default EventsPage;
