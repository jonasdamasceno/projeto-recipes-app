import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { saveDoneRecipesLocalStorage } from '../service/LocalStorage';
import IngredientProgress from './IngredientsProgress';

export default function DrinksInProgress() {
  const history = useHistory();
  const [drink, setDrink] = useState({});
  const { disabledBtnFinalizar } = useContext(ContextRecipes);
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];

  const fetchAPI = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const results = await response.json();
    setDrink(results.drinks[0]);
  };
  console.log(drink);
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleBtnFinalizar = () => {
    const inDate = new Date();
    const str = `${inDate.getDate()}/${inDate.getMonth() + 1}/${inDate.getFullYear()}`;
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      saveDoneRecipesLocalStorage([{
        id: drink.idDrink,
        type: 'drink',
        nationality: (drink.strArea && ''),
        category: (drink.strCategory && ''),
        alcoholicOrNot: (drink.strAlcoholic && ''),
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: str,
        tags: (drink.strTags !== null ? drink.strTags.split(',') : []),

      }]);
    } else {
      saveDoneRecipesLocalStorage([...doneRecipe, {
        id: drink.idDrink,
        type: 'drink',
        nationality: (drink.strArea && ''),
        category: (drink.strCategory && ''),
        alcoholicOrNot: (drink.strAlcoholic && ''),
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: str,
        tags: (drink.strTags !== null ? drink.strTags.split(',') : []),

      }]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strMeal }
        />
        <h2 data-testid="recipe-title">{drink.strDrink}</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{drink.strCategory}</p>
        <p data-testid="instructions">{drink.strInstructions}</p>
      </div>
      <IngredientProgress recipeType={ drink } />
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
