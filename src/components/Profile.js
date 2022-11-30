import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';

export default function Profile() {
  const history = useHistory();
  return (
    <div>
      Profile
      <button type="button" onClick={ () => history.push('./drinks/queijo') }>oi</button>
      <Footer />
    </div>
  );
}
