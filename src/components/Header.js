import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const { title,
    search, setSearch,
  } = useContext(ContextRecipes);
  const history = useHistory();

  return (
    <header>
      <h4 data-testid="page-title">{title}</h4>
      {search
        ? <SearchBar />
        : null}
      <button
        type="button"
        onClick={ () => {
          history.push('./profile');
        } }
      >
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profile icon"
        />
      </button>
      {
        (title === 'Done Recipes'
      || title === 'Favorite Recipes'
      || title === 'Profile')
          ? null
          : (
            <button
              type="button"
              onClick={ () => {
                setSearch(!search);
              } }
            >
              <img
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="search icon"
              />
            </button>
          )
      }
    </header>
  );
}
