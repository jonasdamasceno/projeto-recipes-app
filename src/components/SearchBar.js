import React, { useState } from 'react';
import { requestByFirstLetter, requestByIngredient,
  requestByName } from '../service/RequestAPI';

export default function SearchBar() {
  const [searchRadio, setSearchRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const requestFunctions = {
    ingredient: requestByIngredient,
    name: requestByName,
    firstLetter: requestByFirstLetter,
  };

  const handleRadio = ({ target }) => {
    setSearchRadio(target.value);
  };

  const handleBtnBuscar = () => {
    if (searchRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    requestFunctions[searchRadio](searchInput);
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target }) => { setSearchInput(target.value); } }
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchRadio === 'ingredient' }
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          value="name"
          data-testid="name-search-radio"
          checked={ searchRadio === 'name' }
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          id="first-letter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          checked={ searchRadio === 'firstLetter' }
          onChange={ handleRadio }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleBtnBuscar }
      >
        Buscar

      </button>
    </div>
  );
}
