import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsGrid from './detailsGrid';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';
import PyrrhaHeader from '../../components/PyrrhaHeader';

function DetailsPage(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);
  let { device_id, increment, type } = useParams();

  const active = props.active;
  const language = props.language;
  const page = props.page;
  const setActive = props.setActive;
  const setPage = props.setPage;

  if (Constants.AUTH_DISABLED || currentUser.isAuth) {
    return (
      <>
        <PyrrhaHeader
          active={active}
          page={page}
          setActive={setActive}
          setPage={setPage}
        />
       <DetailsGrid device_id={device_id} increment={increment} type={type} />
      </>
    );
  } else {
    navigate('/login');
    return null;
  }
}

export default DetailsPage;
