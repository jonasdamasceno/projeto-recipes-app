import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saveUserLocalStorage } from '../service/LocalStorage';
import SearchBar from './SearchBar';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(true);
    const regexEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
    const SIX = 6;
    const validatePassword = password.length > SIX;
    if (regexEmail && validatePassword) {
      setDisabled(false);
    }
  }, [password, email]);

  return (
    <div>
      <label htmlFor="email">
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="email">
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ () => {
          saveUserLocalStorage({ email });
          history.push('./meals');
        } }
      >
        Enter

      </button>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}
