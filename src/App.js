// import logo from "./logo.svg";
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/home';
import Starred from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/starred">
            <Starred />
          </Route>
          {/* for default case we use only Route same as that if switch case  */}
          <Route exact path="/show/:id">
            <Show />
          </Route>
          <Route>
            <div>not found</div>
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
