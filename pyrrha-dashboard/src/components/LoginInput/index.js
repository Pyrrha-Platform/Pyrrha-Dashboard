import React, { useContext, useState, useEffect } from 'react';
import { Formik } from 'formik';
import {
  TextInput,
  Button,
  Form,
  Checkbox,
  InlineLoading,
} from 'carbon-components-react';
import AppContext from '../../context/app';
import { ArrowRight32, ArrowLeft16 } from '@carbon/icons-react';

const LoginInput = ({
  setLoginId,
  setStep,
  step,
  initLogin,
  loginId,
  setError,
}) => {
  const { t } = useContext(AppContext);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const ref = React.createRef();

  useEffect(() => {
    if (step === 2) ref.current.focus();
  });

  return (
    <Formik
      initialValues={{ pyrrhaId: loginId, password: '' }}
      validate={(values) => {
        const errors = {};

        if (step === 1 && !values.pyrrhaId) {
          errors.pyrrhaId = t('content.login.form.errors.idRequired');
        }

        if (step === 2 && !values.password) {
          errors.password = t('content.login.form.errors.passwordRequired');
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (step === 1) {
          setLoginId(values.pyrrhaId);

          setStep(2);
        } else {
          initLogin(values.password, setSubmitting);
        }
      }}>
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              setAttemptedSubmit(true);
              handleSubmit();
            }}>
            <TextInput
              id={step === 1 ? 'pyrrhaId' : 'password'}
              type={step === 1 ? 'text' : 'password'}
              className="login_textInput"
              ref={ref}
              labelText={
                step === 1 ? (
                  <p className="login__instructions">
                    <span>{t('content.login.enterId')}</span>
                  </p>
                ) : (
                  <p
                    className="login__goBack"
                    onClick={() => {
                      setError('');
                      setStep(1);
                    }}>
                    <span>
                      <ArrowLeft16 className="login__back-arrow" />
                      {loginId}
                    </span>
                  </p>
                )
              }
              placeholder={
                step === 1
                  ? t('content.login.form.labels.pyrrhaId')
                  : t('content.login.form.labels.password')
              }
              onBlur={handleBlur}
              invalid={
                step === 1
                  ? errors.pyrrhaId && attemptedSubmit
                  : errors.password && attemptedSubmit
              }
              onChange={handleChange}
              value={step === 1 ? values.pyrrhaId : values.password}
              autoComplete={step === 1 ? 'email' : 'current-password'}
            />
            <Button
              renderIcon={step === 1 ? ArrowRight32 : null}
              className={`login__continue-button marb-1 ${
                isSubmitting ? 'display-none' : ''
              }`}
              type="submit"
              iconDescription={t('content.login.continue')}>
              {step === 1 ? 'Continue' : 'Log in'}
            </Button>
            {step === 1 ? (
              <Checkbox
                labelText={t('content.login.rememberMe')}
                className="login__checkbox"
                id="login_rememberMe"
              />
            ) : null}

            {isSubmitting ? (
              <InlineLoading
                className="space-t-2"
                description={t('content.login.loggingIn')}
                status={'active'}
                aria-live={'polite'}
              />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginInput;
