import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const localStorageMock = [
  { alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal' },
  { alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink' },
];

const FAVORITE_RECIPES_PAGE = '/favorite-recipes';

describe('should test favorite recipes page', () => {
  test('should buttons be on screen', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(FAVORITE_RECIPES_PAGE); });
    const bntAll = screen.getByTestId('filter-by-all-btn');
    const bntMeal = screen.getByTestId('filter-by-meal-btn');
    const bntDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(bntAll).toBeInTheDocument();
    expect(bntMeal).toBeInTheDocument();
    expect(bntDrinks).toBeInTheDocument();
  });
  test('should favorite recipes be on screen, should filter buttons works', async () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
    act(() => { history.push('/favorite-recipes'); });
    expect(history.location.pathname).toBe(FAVORITE_RECIPES_PAGE);
    const mealRecipe = screen.getByText(/corba/i);
    const drinkRecipe = screen.getByText(/gg/i);
    expect(mealRecipe && drinkRecipe).toBeInTheDocument();
    const mealsFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilters = screen.getByTestId('filter-by-drink-btn');
    const allRecipesFilter = screen.getByTestId('filter-by-all-btn');

    userEvent.click(mealsFilter);
    const localStorageData = localStorage.getItem('favoriteRecipes');

    waitFor(async () => {
      expect(await JSON.parse(localStorageData)).toHaveLength(2);
    });

    userEvent.click(drinkFilters);
    userEvent.click(allRecipesFilter);
  });
  test('should unfavorite button works', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
    act(() => { history.push(FAVORITE_RECIPES_PAGE); });
    const mealRecipe = screen.getByText(/corba/i);
    const drinkRecipe = screen.getByText(/gg/i);
    expect(mealRecipe).toBeInTheDocument();
    const unfavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(unfavoriteBtn).toHaveTextContent(/desfavoritar/i);
    userEvent.click(unfavoriteBtn);
    expect(drinkRecipe).not.toBeInTheDocument();
  });
  test('should copy button works', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
    act(() => { history.push(FAVORITE_RECIPES_PAGE); });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => 'copy',
      },
    });
    const copyBtn = screen.getAllByTestId('copy-button');

    expect(copyBtn).toHaveLength(2);
    userEvent.click(copyBtn[0]);
  });
});
