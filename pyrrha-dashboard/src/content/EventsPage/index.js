import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsTable from './eventsTable';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';
import './_events-page.scss';

function EventsPage(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return <EventsTable />;
  } else {
    navigate('/login');
    return null;
  }
}

export default EventsPage;
