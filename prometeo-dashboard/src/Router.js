import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrometeoHeader from './components/PrometeoHeader';
import FirefightersPage from './content/FirefightersPage';
import EventsPage from './content/EventsPage';
import DevicesPage from './content/DevicesPage';
import DashboardPage from './content/DashboardPage';
import DetailsPage from './content/DetailsPage';
import LoginPage from './content/LoginPage';
import ProfilePage from './content/ProfilePage';

const Router = () => {
  const [active, setActive] = useState(false);
  const [page, setPage] = useState('Dashboard');
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DashboardPage />
        </Route>
        <Route path="/login">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <LoginPage />
        </Route>
        <Route path="/details/:device_id/:increment/:type">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/details/:device_id/:increment">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/details/:device_id">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/events">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <EventsPage />
        </Route>
        <Route path="/devices">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DevicesPage />
        </Route>
        <Route path="/firefighters">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <FirefightersPage />
        </Route>
        <Route path="/profile">
          <PrometeoHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <ProfilePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
