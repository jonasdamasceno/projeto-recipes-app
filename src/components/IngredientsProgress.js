import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientProgress(props) {
  const { recipeType } = props;

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
          htmlFor="ingredients"
        >
          {ingred}
          {' '}
          <input type="checkbox" name="ingredients" id="ingredients" />
          {' '}

        </label>))}

    </div>
  );
}

IngredientProgress.propTypes = {
  recipeType: PropTypes.shape({
  }).isRequired,
};
