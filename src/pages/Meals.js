import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';
import { requestMeals } from '../service/RequestAPI';

export default function Meals() {
  const { setTitle, requestMeal, setRecipesData } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Meals');
    requestMeals().then((meal) => setRecipesData(meal.meals));
  }, [setTitle, setRecipesData]);
  const TWELVE = 12;

  return (
    <div>
      <Header />
      <div>
        {(requestMeal.length > 1)
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
