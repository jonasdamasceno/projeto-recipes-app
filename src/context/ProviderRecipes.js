import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

export default function ProviderRecipes({ children }) {
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);

  const value = useMemo(() => ({
    search, title, setTitle, setSearch,

  }), [title, setTitle, search, setSearch]);

  return (
    <ContextRecipes.Provider value={ value }>{ children }</ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};
