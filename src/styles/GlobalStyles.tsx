import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        :root {
          --primary-color: #FF6B6B;
          --secondary-color: #FFE66D;
          --text-primary: #333333;
          --text-secondary: #666666;
          --bg-color: #f9f9f9;
          --card-bg: rgba(255, 255, 255, 0.9);
          --bg-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          
          --spacing-xs: 0.25rem;
          --spacing-sm: 0.5rem;
          --spacing-md: 1rem;
          --spacing-lg: 2rem;
          --spacing-xl: 3rem;
          
          --border-radius-sm: 4px;
          --border-radius-md: 8px;
          --border-radius-lg: 16px;
          
          --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
          
          --transition-fast: 0.2s ease;
          --transition-medium: 0.3s ease;
          --transition-slow: 0.5s ease;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background: var(--bg-color);
          color: var(--text-primary);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: relative;
          overflow-x: hidden;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        button {
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
        }
        
        h1, h2, h3, h4, h5, h6 {
          margin: 0 0 1rem;
          line-height: 1.2;
          font-weight: 700;
        }
        
        p {
          margin: 0 0 1rem;
        }
        
        ul, ol {
          margin: 0 0 1rem;
          padding-left: 1.5rem;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        body > .modal-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999999;
        }
      `}
    />
  );
};

export default GlobalStyles; 