import React from 'react';
import PropTypes from 'prop-types';
import '../style/IngredientsInProgress.css';

export default function IngredientProgress(props) {
  const { recipeType } = props;

  const handleCheckbox = ({ target }) => {
    if (target.checked) {
      target.parentElement.className = 'radio-ckecked';
    }
    if (!target.checked) {
      target.parentElement.className = '';
    }
  };

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
            name={ ingred }
            id={ ingred }
            onChange={ handleCheckbox }
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
