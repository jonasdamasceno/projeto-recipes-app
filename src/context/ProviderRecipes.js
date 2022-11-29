import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

export default function ProviderRecipes({ children }) {
  const value = useMemo(() => ({

  }));

  return (
    <ContextRecipes.Provider value={ value }>{ children }</ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};
