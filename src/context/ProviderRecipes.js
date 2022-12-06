import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

export default function ProviderRecipes({ children }) {
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);
  const [requestMeal, setRequestMeal] = useState([]);
  const [requestDrink, setRequestDrink] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const [filters, setFilters] = useState([]);

  const value = useMemo(() => ({
    filters,
    recipesData,
    search,
    title,
    setTitle,
    setSearch,
    requestDrink,
    requestMeal,
    setRequestDrink,
    setRequestMeal,
    setRecipesData,
    setFilters,
  }), [recipesData, title, setTitle, search, filters,
    setFilters, setSearch, requestDrink, requestMeal]);

  return (
    <ContextRecipes.Provider value={ value }>{ children }</ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};
