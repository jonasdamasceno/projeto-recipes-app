import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { saveDoneRecipesLocalStorage } from '../service/LocalStorage';
import IngredientProgress from './IngredientsProgress';

export default function MealsInProgress() {
  const history = useHistory();
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

  console.log(meal);
  // const filterRecipeDone = () => {
  //   recipeDone = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   delete recipeDone.meals[id];
  //   saveRecipeInProgressLocalStorage(recipeDone);
  // };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleBtnFinalizar = () => {
    const inDate = new Date();
    const str = `${inDate.getDate()}/${inDate.getMonth() + 1}/${inDate.getFullYear()}`;
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      saveDoneRecipesLocalStorage([{
        id: meal.idMeal,
        type: 'meal',
        nationality: (meal.strArea && ''),
        category: (meal.strCategory && ''),
        alcoholicOrNot: (meal.strAlcoholic && ''),
        name: meal.strMeal,
        image: meal.strMealThumb,
        doneDate: str,
        tags: (meal.strTags !== null ? meal.strTags.split(',') : []),

      }]);
    } else {
      saveDoneRecipesLocalStorage([...doneRecipe, {
        id: meal.idMeal,
        type: 'meal',
        nationality: (meal.strArea && ''),
        category: (meal.strCategory && ''),
        alcoholicOrNot: (meal.strAlcoholic && ''),
        name: meal.strMeal,
        image: meal.strMealThumb,
        doneDate: str,
        tags: (meal.strTags !== null ? meal.strTags.split(',') : []),

      }]);
    }
    history.push('/done-recipes');
  };

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
        onClick={ handleBtnFinalizar }
      >
        Finalizar

      </button>
    </div>
  );
}
