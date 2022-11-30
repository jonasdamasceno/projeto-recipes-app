export const requestByIngredient = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestByName = async (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestByFirstLetter = async (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};
