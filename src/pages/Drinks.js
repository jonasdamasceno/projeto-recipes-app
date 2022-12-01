import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestDrinkFilters, requestDrinks } from '../service/RequestAPI';
import Recipes from './Recipes';

export default function Drinks() {
  const { setTitle, setRecipesData,
    requestDrink, setFilters, filters } = useContext(ContextRecipes);
  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    setTitle('Drinks');
    requestDrinkFilters().then((filter) => setFilters(filter.drinks));
    requestDrinks().then((drink) => setRecipesData(drink.drinks));
  }, [setTitle, setRecipesData, setFilters]);

  return (
    <div>
      <Header />
      <div>
        <div>
          {
            filters.length > 0
            && filters.slice(0, FIVE).map((category) => (
              <button
                key={ category.strCategory }
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
              >
                {category.strCategory}
              </button>))
          }
        </div>
        {(requestDrink.length > 1)
          ? requestDrink.slice(0, TWELVE).map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt="imagem do drink"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          )) : <Recipes />}
      </div>
      <Footer />
    </div>
  );
}
