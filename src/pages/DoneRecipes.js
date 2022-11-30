import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

export default function DoneRecipes() {
  const { setTitle } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);
  return (
    <div><Header /></div>
  );
}
