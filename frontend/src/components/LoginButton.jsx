import React from 'react';
import { loginWithGoogle } from '../api';
import './LoginButton.css'; // ✅ Import the CSS

const LoginButton = () => {
  return (
    <div className="login-wrapper">
      <button onClick={loginWithGoogle} className="login-button">
        Login with Google
      </button>
    </div>
  );
};

export default LoginButton;
