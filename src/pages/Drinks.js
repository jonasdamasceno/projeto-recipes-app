import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  const { setTitle } = useContext(ContextRecipes);
  useEffect(() => {
    setTitle('Drinks');
  }, [setTitle]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
