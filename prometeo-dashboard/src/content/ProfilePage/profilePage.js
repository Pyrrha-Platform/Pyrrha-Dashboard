import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import AppContext from '../../context/app';
import AuthClient from '../../hooks/useAuth';
import Utils from '../../utils/Utils';

const ProfilePage = () => {
  const { t, currentUser, setCurrentUser } = useContext(AppContext);

  let history = useHistory();

  let onLogoutRequested = async () => {
    try {
      await AuthClient.logout();

      setCurrentUser({
        isAuth: false,
        firstName: '',
        lastName: '',
        email: '',
      });

      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="userinfo_header">
        <span className="userinfo_title" tabIndex={0}>
          User information
        </span>
      </div>
      <Field
        title="Name"
        value={`${currentUser.firstName} ${currentUser.lastName}`}
      />
      <Field title="User ID" value={currentUser.email} />
      <p
        className={'accountSettings__logout'}
        tabIndex={0}
        onKeyDown={(e) => Utils.keyboardOnlySubmit(e, onLogoutRequested)}
        onClick={onLogoutRequested}>
        <span>Logout</span>
      </p>
    </>
  );
};

export default ProfilePage;
