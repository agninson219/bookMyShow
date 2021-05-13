// import logo from "./logo.svg";
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <>This is home page</>
      </Route>
      <Route exact path="/starred">
        <>This is Starred page</>
      </Route>
      {/* for default case we use only Route same as that if switch case  */}
      <Route>
        <>404 error</>
      </Route>
    </Switch>
  );
}

export default App;
