import React, { useEffect, useContext, useState } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import drinkImage from '../images/drinkIcon.svg';
import mealImage from '../images/mealIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const { setTitle } = useContext(ContextRecipes);
  const [favorite, setFavorite] = useState([]);
  // const teste = [{
  //   id: 52977,
  //   type: 'meal',
  //   nationality: 'brazilian',
  //   category: 'category-test',
  //   alcoholicOrNot: '',
  //   name: 'corba',
  //   image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  // }];

  useEffect(() => {
    // const data = JSON.stringify(teste);
    // localStorage.setItem('favoriteRecipes', data);
    setTitle('Favorite Recipes');
  }, [setTitle]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse((localStorage.getItem('favoriteRecipes') || '[]'));
    setFavorite(favoriteRecipes);
  }, []);

  const removeFavoritedRecipe = (str) => {
    const favoriteRecipes = JSON.parse((localStorage.getItem('favoriteRecipes') || '[]'));
    const filteredFavoriteRecipes = favoriteRecipes.filter((el) => el.type.includes(str));
    setFavorite(filteredFavoriteRecipes);
  };
  return (

    <div>
      <Header />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => removeFavoritedRecipe('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => removeFavoritedRecipe('meal') }
        >
          <img
            src={ mealImage }
            data-testid="meals-bottom-btn"
            alt="drink icon"
          />
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => removeFavoritedRecipe('drink') }
        >
          <img
            src={ drinkImage }
            data-testid="drinks-bottom-btn"
            alt="drink icon"
          />
          Drinks
        </button>
      </section>
      <div className="card-container" />
      {favorite.map((recipe, index) => (
        <div key={ index }>
          <img
            alt="recipe"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
          />
          { recipe.type === 'meal'
            ? (
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category}
              </h4>
            )
            : (
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </h4>
            )}

          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <button
            type="button"
            onClick={ () => {} }
          >
            <img
              src={ shareIcon }
              alt="compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => {} }
            src={ blackHeartIcon }
          >
            Desfavoritar

          </button>
        </div>
      ))}
    </div>

  );
}
