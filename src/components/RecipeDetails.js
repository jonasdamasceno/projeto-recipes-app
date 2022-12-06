import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
// import ContextRecipes from '../context/ContextRecipes';

export default function RecipeDetails(props) {
  // console.log(location);
  const [recipe, setRecipe] = useState({});
  // console.log(props);
  const fetchAPI = async (arg) => {
    const b = arg.pathname.split('/');
    const id = b[2];
    // console.log(b);
    let url = '';
    if (b[1] === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else { url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; }
    const response = await fetch(url);
    const results = await response.json();
    // console.log(results);
    // console.log(Object.keys(results)[0], results.meals[0]);
    if (Object.keys(results)[0] === 'meals') {
      setRecipe(results.meals[0]);
    } else {
      setRecipe(results.drinks[0]);
    }
    // console.log(arg.path);
  };
  // console.log(recipe);
  // console.log(Object.keys(recipe).find((el) => el.includes('Thumb')));

  function renderIngredients(param1) {
    const asArray = Object.entries(recipe);
    const filtered = asArray.filter(([key, value]) => key.includes(param1)
    && value !== null && value !== '');
    // console.log(filtered);
    const a = filtered.map((el) => el[1]);
    return a;
    // console.log(a);
  }
  useEffect(() => {
    const { location } = props;
    fetchAPI(location);
  }, []);
  const z = renderIngredients('Ingredient');
  const x = renderIngredients('Measure');

  const juntaArrays = () => {
    const newArray = [];
    for (let index = 0; index < x.length; index += 1) {
      newArray.push(`${x[index]} ${z[index]}`);
    }
    return newArray;
  };

  return (
    <div>
      <img
        src={ recipe[(Object.keys(recipe)
          .find((el) => el.includes('Thumb')))] }
        alt="imagem"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">
        { recipe[(Object.keys(recipe)
          .find((el) => el.includes('str')))] }
      </p>
      <p data-testid="recipe-category">
        { recipe.strAlcoholic !== null && recipe[(Object.keys(recipe)
          .find((el) => el.includes('Category')))]
          + recipe.strAlcoholic}
      </p>
      {juntaArrays().map((item, index) => (
        <p
          key={ item }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {item}
        </p>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {recipe.strYoutube !== null
      && <embed data-testid="video" src={ recipe.strYoutube } />}
      <button
        type="button"
        className="start-recipe-button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorito
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
  }).isRequired,
};
