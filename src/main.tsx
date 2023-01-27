import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';

const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#111'
};

const lightTheme = {
  textColor: '#111',
  backgroundColor: 'whitesmoke'
};

const pastelTheme = {
  textColor: 'lightpink',
  backgroundColor: 'beige'
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
