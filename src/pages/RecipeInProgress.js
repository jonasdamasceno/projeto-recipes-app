import React, { useContext } from 'react';
import DrinksInProgress from '../components/DrinksInProgress';
import MealsInProgress from '../components/MealsInProgress';
import ContextRecipes from '../context/ContextRecipes';

export default function RecipeInProgress() {
  const { title } = useContext(ContextRecipes);

  return (
    <div>
      {title === 'Meals'
      && (
        <div>
          <MealsInProgress />
        </div>
      )}
      {title === 'Drinks'
      && (
        <div>
          <DrinksInProgress />
        </div>
      )}
      ola

    </div>
  );
}
