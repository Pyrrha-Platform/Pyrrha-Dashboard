import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import "./App.scss";
import FirefightersPage from "./content/FirefightersPage";
import EventsPage from "./content/EventsPage";
import DevicesPage from "./content/DevicesPage";
import DashboardPage from "./content/DashboardPage";
import DetailsPage from "./content/DetailsPage";
import ProfilePage from "./content/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route path="/details/:id" component={DetailsPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/devices" component={DevicesPage} />
        <Route path="/firefighters" component={FirefightersPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
