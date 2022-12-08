import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import IngredientProgress from './IngredientsProgress';

export default function MealsInProgress() {
  const [meal, setMeal] = useState({});
  const { disabledBtnFinalizar } = useContext(ContextRecipes);
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];

  const fetchAPI = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const results = await response.json();
    setMeal(results.meals[0]);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>

      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
        <h2 data-testid="recipe-title">{meal.strMeal}</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <p data-testid="instructions">{meal.strInstructions}</p>
      </div>
      <IngredientProgress recipeType={ meal } />
      <button
        type="button"
        className="finish-button"
        data-testid="finish-recipe-btn"
        disabled={ disabledBtnFinalizar }
      >
        Finalizar

      </button>
    </div>
  );
}
