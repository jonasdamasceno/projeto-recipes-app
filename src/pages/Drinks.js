import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  const { setTitle, requestDrink } = useContext(ContextRecipes);
  const TWELVE = 12;
  useEffect(() => {
    setTitle('Drinks');
  }, [setTitle]);

  return (
    <div>
      <Header />
      <div>
        {(requestDrink.length > 1)
        && requestDrink.slice(0, TWELVE).map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt="imagem do drink"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
