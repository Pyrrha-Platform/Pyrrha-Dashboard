import React, { useContext, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineNotification } from 'carbon-components-react';

import AppContext from '../../context/app';
import ProfileInput from '../../components/ProfileInput';
import PrometeoHeader from '../../components/PrometeoHeader';

import AuthClient from '../../hooks/useAuth';

const ProfilePage = ({ history }) => {
  const { t, setCurrentUser } = useContext(AppContext);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [profileId, setProfileId] = useState('');

  const initProfile = useCallback(
    /**
     * Init profile and set user on success. Catch errors
     * handled by Auth client and sets error state.
     * @param {string} password
     * @param {function} setSubmitting
     */
    async (password, setSubmitting) => {
      setSubmitting(true);
      setError('');

      try {
        const user = await AuthClient.profile(profileId, password);

        setSubmitting(false);

        setCurrentUser({
          isAuth: true,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        console.log('Profile successful ', user.email);
        return history.push('/');
      } catch (err) {
        setSubmitting(false);

        return setError(t(err));
      }
    },
    [profileId, setCurrentUser, t, history]
  );

  return (
    <>
      <PrometeoHeader removeProfile />
      <div className="profile__container">
        <div className="profile__spacer" />
        <div>
          <h1 className="profile__title">
            {t('content.profile.title')}
            <span className="profile__prometeo">{` Prometeo`}</span>
          </h1>
        </div>

        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            // By changing the key, React treats each step as a unique component
            key={`profile-${step}`}
            transition={{
              type: 'spring',
              bounce: 0.4,
              duration: 0.35,
            }}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}>
            <div className="profile__supportingContainer">
              {step === 2 ? (
                <p className="profile__forgotPassword">
                  <span>{t('content.profile.forgotPassword')}</span>
                </p>
              ) : null}
            </div>

            <ProfileInput
              step={step}
              setStep={setStep}
              setProfileId={setProfileId}
              initProfile={initProfile}
              profileId={profileId}
              setError={setError}
            />
            {error ? (
              <InlineNotification
                kind="error"
                subtitle={<span>{error}</span>}
                title={t('content.profile.errors.errorHeading')}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProfilePage;
