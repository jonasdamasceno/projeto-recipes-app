import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

const whiteHEart = 'http://localhost/whiteHeartIcon.svg';

describe('test RecipeDetails', () => {
  test('1) btn share and copy link for drinks', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/drinks/178319');
    });
    localStorage.clear();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => 'copy',
      },
    });
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
    const btnShare = screen.getByTestId('share-btn');
    const btnFavorite = screen.getByTestId('favorite-btn');
    const btnStart = screen.getByTestId('start-recipe-btn');

    expect(btnShare && btnFavorite).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(null);

    expect(btnFavorite.src).toBe(whiteHEart);
    userEvent.click(btnFavorite);
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');
    // expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favoriteDrink);
    userEvent.click(btnFavorite);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
    expect(btnFavorite.src).toBe(whiteHEart);

    userEvent.click(btnShare);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });

  test('2) btn share and copy link for drinks', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    localStorage.clear();

    act(() => {
      history.push('/meals/52771');
    });

    const btnShare = screen.getByTestId('share-btn');
    const btnFavorite = screen.getByTestId('favorite-btn');
    const btnStart = screen.getByTestId('start-recipe-btn');

    expect(btnShare && btnFavorite).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(null);

    expect(btnFavorite.src).toBe(whiteHEart);
    userEvent.click(btnFavorite);
    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');

    userEvent.click(btnFavorite);
    expect(btnFavorite.src).toBe(whiteHEart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);

    userEvent.click(btnShare);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });
});
