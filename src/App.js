import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';
import Login from './components/Login';

function App() {
  return (
    <ProviderRecipes>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route exact path="/game" component={ Game } /> */}
      </Switch>
    </ProviderRecipes>
  );
}

export default App;
