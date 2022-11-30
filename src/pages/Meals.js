import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Meals() {
  const { setTitle } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);

  return (
    <div>
      <Header />
      <Footer />
    </div>

  );
}
