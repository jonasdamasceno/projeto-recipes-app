import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestDrinks } from '../service/RequestAPI';
import Recipes from './Recipes';

export default function Drinks() {
  const { setTitle, setRecipesData, requestDrink } = useContext(ContextRecipes);
  const TWELVE = 12;
  useEffect(() => {
    setTitle('Drinks');
    requestDrinks().then((drink) => setRecipesData(drink.drinks));
  }, [setTitle, setRecipesData]);

  return (
    <div>
      <Header />
      <div>
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
