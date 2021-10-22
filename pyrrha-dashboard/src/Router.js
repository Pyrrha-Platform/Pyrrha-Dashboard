import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PyrrhaHeader from './components/PyrrhaHeader';
import FirefightersPage from './content/FirefightersPage';
import EventsPage from './content/EventsPage';
import DevicesPage from './content/DevicesPage';
import DashboardPage from './content/DashboardPage';
import DetailsPage from './content/DetailsPage';
import LoginPage from './content/LoginPage';
import MapPage from './content/MapPage';
import ProfilePage from './content/ProfilePage';

const Router = () => {
  const [active, setActive] = useState(false);
  const [page, setPage] = useState('Dashboard');

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DashboardPage />
        </Route>
        <Route path="/login">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <LoginPage />
        </Route>
        <Route path="/details/:device_id/:increment/:type">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/details/:device_id/:increment">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/details/:device_id">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DetailsPage />
        </Route>
        <Route path="/map">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <MapPage />
        </Route>
        <Route path="/events">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <EventsPage />
        </Route>
        <Route path="/devices">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <DevicesPage />
        </Route>
        <Route path="/firefighters">
          <PyrrhaHeader
            active={active}
            page={page}
            setActive={setActive}
            setPage={setPage}
          />
          <FirefightersPage />
        </Route>
        <Route path="/profile">
          <PyrrhaHeader
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
