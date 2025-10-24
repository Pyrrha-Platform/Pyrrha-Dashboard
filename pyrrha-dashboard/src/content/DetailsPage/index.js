import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsGrid from './detailsGrid';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function DetailsPage(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);
  const { device_id, increment, type } = useParams();

  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return (
      <DetailsGrid
        device_id={device_id}
        increment={increment}
        type={type}
        key={device_id}
      />
    );
  } else {
    navigate('/login');
    return null;
  }
}

export default DetailsPage;
