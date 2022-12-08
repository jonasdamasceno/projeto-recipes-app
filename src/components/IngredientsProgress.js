import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/IngredientsInProgress.css';
import { useHistory } from 'react-router-dom';
import { saveRecipeInProgressLocalStorage } from '../service/LocalStorage';

export default function IngredientProgress(props) {
  const { recipeType } = props;
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = history.location.pathname.split('/')[2];
  // RIP = Recipe In Progress
  const [rip, setRip] = useState({ meals: { }, drinks: { } });
  const [checkedMap, setCheckedMap] = useState({});

  const isChecked = (param) => {
    if (pathname.includes('/meals')) {
      param.meals[id].forEach((el) => {
        checkedMap[el] = el;
      });
    }
    if (pathname.includes('/drinks')) {
      param.drinks[id].forEach((el) => {
        checkedMap[el] = el;
      });
    }
    setCheckedMap(checkedMap);
  };

  useEffect(() => {
    let items;
    if (Object.keys(rip.meals).length === 0
      || (rip.drinks && Object.keys(rip.drinks).length === 0)) {
      items = JSON.parse(localStorage.getItem('inProgressRecipes'));
      isChecked(items);
    } else {
      items = rip;
    }
    saveRecipeInProgressLocalStorage(items);
  }, [rip]);

  function renderIngredients(param1) {
    const asArray = Object.entries(recipeType);
    const filtered = asArray.filter(([key, value]) => key.includes(param1)
    && value !== null && value !== '');
    const ingredients = filtered.map((el) => el[1]);
    return ingredients;
  }

  const ingredientsName = renderIngredients('Ingredient');
  const IngredientsQuantity = renderIngredients('Measure');

  const juntaArrays = () => {
    const newArray = [];
    for (let index = 0; index < ingredientsName.length; index += 1) {
      newArray.push(`${IngredientsQuantity[index]} ${ingredientsName[index]}`);
    }
    return newArray;
  };

  const handleCheckbox = ({ target }) => {
    if (target.checked) {
      target.parentElement.className = 'radio-ckecked';
    }
    if (!target.checked) {
      target.parentElement.className = '';
      if (pathname.includes('/meals')) {
        setRip({ ...rip,
          meals: { [id]: rip.meals[id].filter((meal) => meal !== +target.name) },
          ...rip.drinks });
      }
      if (pathname.includes('/drinks')) {
        setRip({ ...rip,
          drinks: { [id]: rip.drinks[id].filter((drink) => drink !== +target.name) },
          ...rip.meals });
      }
    }
  };

  const handleClickCheckbox = ({ target }) => {
    const { name } = target;
    if (pathname.includes('/meals')) {
      if (!rip.meals[id]) {
        setRip({ meals: { [id]: [+name] }, ...rip.drinks });
        // saveRecipeInProgressLocalStorage(rip);
      } else {
        setRip({ ...rip,
          meals:
              { [id]: [...rip.meals[id], +name] } });
        // saveRecipeInProgressLocalStorage(rip);
      }
    } if (pathname.includes('/drinks')) {
      if (!rip.drinks[id]) {
        setRip({ drinks: { [id]: [+name] }, ...rip.meals });
        // saveRecipeInProgressLocalStorage(rip);
      } else {
        setRip({ ...rip,
          drinks:
              { [id]: [...rip.drinks[id], +name] } });
        // saveRecipeInProgressLocalStorage(rip);
      }
    }
  };

  return (
    <div>
      {juntaArrays().map((ingred, index) => (
        <label
          key={ ingred }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingred }
        >
          {ingred}
          {' '}
          <input
            type="checkbox"
            name={ index }
            id={ ingred }
            checked={ checkedMap[index] }
            onChange={ handleCheckbox }
            onClick={ handleClickCheckbox }
          />
          {' '}

        </label>))}

    </div>
  );
}

IngredientProgress.propTypes = {
  recipeType: PropTypes.shape({
  }).isRequired,
};
