import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
} from 'carbon-components-react/lib/components/UIShell';
import UserAvatar20 from '@carbon/icons-react/lib/user--avatar/20';
import Translate20 from '@carbon/icons-react/lib/translate/20';
import AppContext from '../../context/app';

function PrometeoHeader(props) {
  const active = props.active;
  const language = props.language;
  const page = props.page;
  const setActive = props.setActive;
  const setLanguage = props.setLanguage;
  const setPage = props.setPage;

  const history = useHistory();

  const { t, i18n, currentUser } = useContext(AppContext);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  console.log(currentUser);

  return (
    <Header aria-label="Prometeo">
      <SkipToContent />
      <HeaderName
        element={Link}
        to="/"
        prefix="Prometeo"
        onClick={() => {
          setPage('Dashboard');
        }}>
        Platform
      </HeaderName>
      {currentUser.isAuth && (
        <HeaderNavigation aria-label={t('components.header.title')}>
          <HeaderMenuItem
            element={Link}
            to="/"
            isCurrentPage={page === 'Dashboard'}
            onClick={() => {
              setPage('Dashboard');
            }}>
            {t('components.header.dashboard')}
          </HeaderMenuItem>
          <HeaderMenuItem
            element={Link}
            to="/events"
            isCurrentPage={page === 'Events'}
            onClick={() => {
              setPage('Events');
            }}>
            {t('components.header.events')}
          </HeaderMenuItem>
          <HeaderMenuItem
            element={Link}
            to="/devices"
            isCurrentPage={page === 'Devices'}
            onClick={() => {
              setPage('Devices');
            }}>
            {t('components.header.devices')}
          </HeaderMenuItem>
          {/*
          <HeaderMenuItem
            element={Link}
            to="/firefighters"
            isCurrentPage={page === 'Firefighters'}
            onClick={() => {
              setPage('Firefighters');
            }}>
            {t('components.header.firefighters')}
          </HeaderMenuItem>
          */}
        </HeaderNavigation>
      )}
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Translate"
          onClick={() => setActive(!active)}
          isActive={active}>
          <Translate20 />
        </HeaderGlobalAction>
        {currentUser.isAuth && (
          <HeaderGlobalAction
            aria-label="Profile"
            onClick={() => {
              history.push('/profile');
              setPage('Profile');
            }}>
            <UserAvatar20 />
          </HeaderGlobalAction>
        )}
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={active}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem
            aria-label={t('components.header.english')}
            isSelected={language === 'en'}
            onClick={() => {
              setLanguage('en');
              setActive(false);
              changeLanguage('en');
            }}>
            {t('components.header.english')}
          </SwitcherItem>
          <SwitcherItem
            aria-label={t('components.header.spanish')}
            isSelected={language === 'es'}
            onClick={() => {
              setLanguage('es');
              setActive(false);
              changeLanguage('es');
            }}>
            {t('components.header.spanish')}
          </SwitcherItem>
          <SwitcherItem
            aria-label={t('components.header.catalan')}
            isSelected={language === 'ca'}
            onClick={() => {
              setLanguage('ca');
              setActive(false);
              changeLanguage('ca');
            }}>
            {t('components.header.catalan')}
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default PrometeoHeader;
