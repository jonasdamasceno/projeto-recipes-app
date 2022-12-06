import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

export default function DrinksInProgress() {
  const { recipesData } = useContext(ContextRecipes);
  const location = useLocation();

  const drinkId = location.pathname.split('/')[1];
  console.log(drinkId);

  const drinkItem = recipesData.filter((drink) => (drink.idDrink === drinkId));
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drinkItem.strDrinkThumb }
        alt={ drinkId.strDrink }
      />
      <h2 data-testid="recipe-title">{drinkItem.strDrink}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{drinkItem.strCategory}</p>
      <p data-testid="instructions">{drinkItem.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
