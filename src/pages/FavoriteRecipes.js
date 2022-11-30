import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

export default function FavoriteRecipes() {
  const { setTitle } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);
  return (

    <div><Header /></div>
  );
}
