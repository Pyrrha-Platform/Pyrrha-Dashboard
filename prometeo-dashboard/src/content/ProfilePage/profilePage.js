import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import AppContext from '../../context/app';
import AuthClient from '../../hooks/useAuth';
import Utils from '../../utils/Utils';
import { Button } from 'carbon-components-react';
import { ArrowRight32, ArrowLeft16 } from '@carbon/icons-react';

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
    <div className="bx--grid bx--grid--full-width events-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="profile-page__heading">
            {t('content.profile.heading')}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="profile-page__subheading">
            {t('content.profile.subheading')}
          </h2>
        </div>
      </div>

      <Field
        title={t('content.profile.name')}
        value={`${currentUser.firstName} ${currentUser.lastName}`}
      />
      <Field title={t('content.profile.userId')} value={currentUser.email} />
      <Button
        renderIcon={ArrowRight32}
        iconDescription={t('content.profile.logout')}
        onKeyDown={(e) => Utils.keyboardOnlySubmit(e, onLogoutRequested)}
        onClick={onLogoutRequested}>
        {t('content.profile.logout')}
      </Button>
    </div>
  );
};

export default ProfilePage;
