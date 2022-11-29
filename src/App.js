import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';

function App() {
  return (
    <ProviderRecipes>
      <div>queijo</div>
    </ProviderRecipes>
  );
}

export default App;
