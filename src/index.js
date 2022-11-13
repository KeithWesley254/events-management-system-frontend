import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ThemeContext from './ThemeContext';
import UserContext from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext>
      <ThemeContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContext>
    </UserContext>   
  </React.StrictMode>
);
