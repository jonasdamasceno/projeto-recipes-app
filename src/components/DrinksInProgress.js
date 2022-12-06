import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IngredientProgress from './IngredientsProgress';

export default function DrinksInProgress() {
  const [drink, setDrink] = useState({});
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const id = locationSplit[2];

  console.log(id);
  const fetchAPI = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    setDrink(results.drinks[0]);
  };

  // function renderIngredients(param1) {
  //   const asArray = Object.entries(recipe);
  //   const filtered = asArray.filter(([key, value]) => key.includes(param1)
  //   && value !== null && value !== '');
  //   const a = filtered.map((el) => el[1]);
  //   return a;
  // }
  console.log(drink);
  useEffect(() => {
    fetchAPI();
  }, []);

  // const z = renderIngredients('Ingredient');
  // const x = renderIngredients('Measure');

  // const juntaArrays = () => {
  //   const newArray = [];
  //   for (let index = 0; index < x.length; index += 1) {
  //     newArray.push(`${x[index]} ${z[index]}`);
  //   }
  //   return newArray;
  // };

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
        <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      </div>
      <IngredientProgress recipeType={ drink } />

    </div>
  );
}
