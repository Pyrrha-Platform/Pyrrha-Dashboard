import { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default createContext({});

export const useAppContext = () => {

  const { t, i18n } = useTranslation();
  const [currentUser, setCurrentUser] = useState({
    isAuth: false,
    firstName: '',
    lastName: '',
    email: '',
  });
  
  const [locale, setLocale] = useState('en-us');

  return {
    currentUser,
    setCurrentUser,
    t,
    i18n,
    locale,
    setLocale,
  };

};
