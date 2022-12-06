import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';
import { requestMealBySelectedFilter,
  requestMealFilters, requestMeals } from '../service/RequestAPI';

export default function Meals() {
  const TWELVE = 12;
  const FIVE = 5;

  const { setTitle, requestMeal, setRecipesData,
    filters, setFilters, setRequestMeal,
    setFilterToggle, filterToggle } = useContext(ContextRecipes);

  const submitFilter = (event) => {
    const { target: { value } } = event;
    requestMealBySelectedFilter(value).then((meal) => setRequestMeal(meal.meals));
    setFilterToggle(!filterToggle);
  };

  useEffect(() => {
    setTitle('Meals');
    requestMealFilters().then((filter) => setFilters(filter.meals));
    requestMeals().then((meal) => setRecipesData(meal.meals));
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
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ submitFilter }
              >
                {category.strCategory}
              </button>))
          }
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => {
              setRequestMeal([]);
            } }
          >
            All

          </button>
        </div>
        {(requestMeal.length >= 1 && !filterToggle)
          ? requestMeal.slice(0, TWELVE).map((drink, index) => (
            <div key={ drink.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strMealThumb }
                alt="imagem do drink"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strMeal}</p>
            </div>
          )) : <Recipes />}
      </div>
      <Footer />
    </div>

  );
}
