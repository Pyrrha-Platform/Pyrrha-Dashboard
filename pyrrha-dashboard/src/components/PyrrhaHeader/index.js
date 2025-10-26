import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SkipToContent,
} from '@carbon/react';
import { UserAvatar, Translate } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

function PyrrhaHeader(props) {
  const active = props.active;
  const language = props.language;
  const page = props.page;
  const setActive = props.setActive;
  const setPage = props.setPage;

  const navigate = useNavigate();

  const { t, i18n, currentUser, setLocale } = useContext(AppContext);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // console.log(currentUser);

  return (
    <Header aria-label="Pyrrha" className="cds--g100">
      <SkipToContent />
      <HeaderName
        element={Link}
        to="/"
        prefix="Pyrrha"
        onClick={() => {
          setPage('Dashboard');
        }}
      >
        Platform
      </HeaderName>
      {(Constants.AUTH_DISABLED || currentUser.isAuth) && (
        <HeaderNavigation aria-label={t('components.header.title')}>
          <HeaderMenuItem
            element={Link}
            to="/"
            isCurrentPage={page === 'Dashboard'}
            onClick={() => {
              setPage('Dashboard');
            }}
          >
            {t('components.header.dashboard')}
          </HeaderMenuItem>
          <HeaderMenuItem
            element={Link}
            to="/devices"
            isCurrentPage={page === 'Devices'}
            onClick={() => {
              setPage('Devices');
            }}
          >
            {t('components.header.devices')}
          </HeaderMenuItem>
          {/*
          <HeaderMenuItem
            element={Link}
            to="/events"
            isCurrentPage={page === 'Events'}
            onClick={() => {
              setPage('Events');
            }}
          >
            {t('components.header.events')}
          </HeaderMenuItem>
          */}
          <HeaderMenuItem
            element={Link}
            to="/map"
            isCurrentPage={page === 'Map'}
            onClick={() => {
              setPage('Map');
            }}
          >
            {t('components.header.map')}
          </HeaderMenuItem>
          <HeaderMenuItem
            element={Link}
            to="/firefighters"
            isCurrentPage={page === 'Firefighters'}
            onClick={() => {
              setPage('Firefighters');
            }}
          >
            {t('components.header.firefighters')}
          </HeaderMenuItem>
        </HeaderNavigation>
      )}
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Translate"
          onClick={() => setActive(!active)}
          isActive={active}
        >
          <Translate size={20} />
        </HeaderGlobalAction>
        {currentUser.isAuth && (
          <HeaderGlobalAction
            aria-label="Profile"
            onClick={() => {
              navigate('/profile');
              setPage('Profile');
            }}
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        )}
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={active}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem
            aria-label={t('components.header.english')}
            isSelected={language === 'en'}
            onClick={() => {
              setLocale('en-us');
              setActive(false);
              changeLanguage('en');
            }}
          >
            {t('components.header.english')}
          </SwitcherItem>
          <SwitcherItem
            aria-label={t('components.header.spanish')}
            isSelected={language === 'es'}
            onClick={() => {
              setLocale('es-es');
              setActive(false);
              changeLanguage('es');
            }}
          >
            {t('components.header.spanish')}
          </SwitcherItem>
          <SwitcherItem
            aria-label={t('components.header.catalan')}
            isSelected={language === 'ca'}
            onClick={() => {
              setLocale('ca-es');
              setActive(false);
              changeLanguage('ca');
            }}
          >
            {t('components.header.catalan')}
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default PyrrhaHeader;
