import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Meals() {
  const { setTitle, requestMeal } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);
  const TWELVE = 12;

  return (
    <div>
      <Header />
      <div>
        {(requestMeal.length > 1)
        && requestMeal.slice(0, TWELVE).map((drink, index) => (
          <div key={ drink.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strMealThumb }
              alt="imagem do drink"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strMeal}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>

  );
}
