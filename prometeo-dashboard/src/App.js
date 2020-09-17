import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import { Button } from 'carbon-components-react';
import './App.scss';
import FirefightersPage from './content/FirefightersPage';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
        <BrowserRouter>
          <div>
            <Link className="App-link" to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/page2">Page2</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/firefighters">Firefighters</Link>
          </div>
          <Switch>
            <Route exact path="/">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <p>The current time is {currentTime}.</p>
                <Button>Button</Button>
            </Route>
            <Route path="/page2">
                <p>This is page 2!</p>
            </Route>
            <Route path="/firefighters">
                <FirefightersPage />
            </Route>
          </Switch>
        </BrowserRouter>
  );
}

export default App;
