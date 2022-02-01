import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirefightersTable from './firefightersTable';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';
import PyrrhaHeader from '../../components/PyrrhaHeader';

function FirefightersPage(props) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);
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
        <FirefightersTable />
      </>
    );
  } else {
    navigate('/login');
    return null;
  }
}

export default FirefightersPage;
