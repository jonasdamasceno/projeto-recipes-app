import React, { useContext, useEffect } from 'react';

export default function RecipeDetails(props) {
  const fetchAPI = async (id) => {
    const title = useContext(ContextRecipes);
    const a = props.match.params.id;
    if (title === meals) {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const { results } = await response.json();
  };
  const a = useParams();
  useEffect(() => {
    a;
  }, [a]);
  console.log(props);
  return (
    <div>{`RecipeDetails${props.match.params.id}`}</div>
  );
}
