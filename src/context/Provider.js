import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

export default function ContextProvider({ children }) {
  const value = useMemo(() => ({

  }));

  return (
    <ContextRecipes.Provider value={ value }>{ children }</ContextRecipes.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
