import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

export default function MealsInProgress() {
  const { recipesData } = useContext(ContextRecipes);
  const location = useLocation();

  const mealsId = location.pathname.split('/')[2];
  console.log(mealsId);

  const mealsItem = recipesData.filter((meals) => (meals.idDrink === mealsId));
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ mealsItem.strMealThumb }
        alt={ mealsItem.strMeal }
      />
      <h2 data-testid="recipe-title">{mealsItem.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{mealsItem.strCategory}</p>
      <p data-testid="instructions">{mealsItem.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
