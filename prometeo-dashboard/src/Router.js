import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrometeoHeader from './components/PrometeoHeader';
import FirefightersPage from './content/FirefightersPage';
import EventsPage from './content/EventsPage';
import DevicesPage from './content/DevicesPage';
import DashboardPage from './content/DashboardPage';
import DetailsPage from './content/DetailsPage';
import LoginPage from './content/LoginPage';
import ProfilePage from './content/ProfilePage';
import SideMenu from './components/SideMenu';

const Router = () => {
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState('en');
  const [page, setPage] = useState('Dashboard');
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          {/* <SideMenu /> */}
          <DashboardPage />
        </Route>
        <Route path="/login">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <LoginPage />
        </Route>
        <Route path="/details/:device_id/:increment/:type">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/details/:device_id/:increment">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/details/:device_id">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/events">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <EventsPage />
        </Route>
        <Route path="/devices">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <DevicesPage />
        </Route>
        <Route path="/firefighters">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <FirefightersPage />
        </Route>
        <Route path="/profile">
          <PrometeoHeader
            active={active}
            language={language}
            page={page}
            setActive={setActive}
            setLanguage={setLanguage}
            setPage={setPage}
          />
          <ProfilePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
