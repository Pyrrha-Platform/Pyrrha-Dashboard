import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.scss';
import FirefightersPage from './content/FirefightersPage';
import EventsPage from './content/EventsPage';
import DevicesPage from './content/DevicesPage';
import DashboardPage from './content/DashboardPage';
import ReportsPage from './content/ReportsPage';

function App() {
  
  return (
        <BrowserRouter>
          <div>
            <Link className="App-link" to="/">Dashboard</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/firefighters">Firefighters</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/events">Events</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/devices">Devices</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/reports">Reports</Link>
          </div>
          <Switch>
            <Route exact path="/">
              <DashboardPage />
            </Route>
            <Route path="/events">
              <EventsPage />
            </Route>
            <Route path="/devices">
              <DevicesPage />
            </Route>
            <Route path="/reports">
              <ReportsPage />
            </Route>
            <Route path="/firefighters">
              <FirefightersPage />
            </Route>
          </Switch>
        </BrowserRouter>
  );
}

export default App;
