import React, { useState } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import AppContext, { useAppContext } from "./context/app";
import "./App.scss";
import PrometeoHeader from "./components/PrometeoHeader";
import FirefightersPage from "./content/FirefightersPage";
import EventsPage from "./content/EventsPage";
import DevicesPage from "./content/DevicesPage";
import DashboardPage from "./content/DashboardPage";
import DetailsPage from "./content/DetailsPage";

function App() {
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [page, setPage] = useState("Dashboard");
  return (
    <AppContext.Provider value={useAppContext()}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <PrometeoHeader
              history={history}
              active={active}
              language={language}
              page={page}
              setActive={setActive}
              setLanguage={setLanguage}
              setPage={setPage}
            />
            <DashboardPage />
          </Route>
          <Route path="/details/:firefighterId/:increment/:type">
            <PrometeoHeader
              history={history}
              active={active}
              language={language}
              page={page}
              setActive={setActive}
              setLanguage={setLanguage}
              setPage={setPage}
            />
            <DetailsPage />
          </Route>
          <Route path="/details/:firefighterId/:increment">
            <PrometeoHeader
              history={history}
              active={active}
              language={language}
              page={page}
              setActive={setActive}
              setLanguage={setLanguage}
              setPage={setPage}
            />
            <DetailsPage />
          </Route>
          <Route path="/details/:firefighterId">
            <PrometeoHeader
              history={history}
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
              history={history}
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
              history={history}
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
              history={history}
              active={active}
              language={language}
              page={page}
              setActive={setActive}
              setLanguage={setLanguage}
              setPage={setPage}
            />
            <FirefightersPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
