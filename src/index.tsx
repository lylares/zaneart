import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';

// 添加全局样式
const style = document.createElement('style');
style.innerHTML = `
  body {
    position: relative;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
