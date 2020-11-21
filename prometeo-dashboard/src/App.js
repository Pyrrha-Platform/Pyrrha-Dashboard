import React, { useState, useEffect } from 'react';
import { 
    BrowserRouter, 
    Link, 
    Switch, 
    Route 
} from 'react-router-dom';
import './App.scss';
import FirefightersPage from './content/FirefightersPage';
import EventsPage from './content/EventsPage';
import DevicesPage from './content/DevicesPage';
import DashboardPage from './content/DashboardPage';
import DetailsPage from './content/DetailsPage';
import ReportsPage from './content/ReportsPage';
import LanguagePage from './content/LanguagePage';
import ProfilePage from './content/ProfilePage';

function App() {
  
  return (
        <BrowserRouter>
          <div>
            <Link className="App-link" to="/">Dashboard</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/details">Details</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/firefighters">Firefighters</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/events">Events</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/devices">Devices</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/reports">Reports</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/profile">Profile</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/language">Language</Link>
          </div>
          <Switch>
            <Route exact path="/">
              <DashboardPage />
            </Route>
            <Route path="/details">
              <DetailsPage />
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
            <Route path="/language">
              <LanguagePage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </BrowserRouter>
  );
}

export default App;
