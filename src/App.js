// import logo from "./logo.svg";
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/home';
import Starred from './pages/Starred';

function App() {
  return (
    <div>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        {/* for default case we use only Route same as that if switch case  */}
        <Route>
          <div>not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
