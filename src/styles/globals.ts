import { createGlobalStyle } from 'styled-components';
import { media } from '@/lib/styled/media';
import { normalize } from './normalize';

export const GlobalStyle = createGlobalStyle`
  // Normalize
  ${normalize}

  // Custom FontFaces
  ${({ theme }) => {
    return theme.fonts?.join('\n');
  }}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background-color: #f8f8f8;
    font-family: 'NotoSans', sans-serif;
    font-size: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ${media.small} {
    .hidden${'\\:\\:small'} { display: none !important; }
  }
  ${media.big} {
    .hidden${'\\:\\:big'} { display: none !important; }
  }
`;
