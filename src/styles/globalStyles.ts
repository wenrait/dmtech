import { createGlobalStyle } from 'styled-components';
import { colors } from './colors.ts';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    line-height: 20px;
    font-family: 'Nunito', sans-serif;
    background: ${colors.brand.lightest};
  }
  
  header {
    border-bottom: 1px solid ${colors.brand.lighter};
  }
  
  main {
    padding: 24px;
    display: flex;
    justify-content: center;
  }
`;
