import { DefaultTheme } from 'styled-components';
import { fontFace } from '@/lib/styled/mixins';

export const BaseTheme: DefaultTheme = {
  contentWidth: 1200,

  // Font / Text
  fonts: [
    fontFace('NotoSans', 100, '/fonts/NotoKR/NotoSansKR-Thin'),
    fontFace('NotoSans', 200, '/fonts/NotoKR/NotoSansKR-Light'),
    fontFace('NotoSans', 300, '/fonts/NotoKR/NotoSansKR-DemiLight'),
    fontFace('NotoSans', 400, '/fonts/NotoKR/NotoSansKR-Regular'),
    fontFace('NotoSans', 500, '/fonts/NotoKR/NotoSansKR-Medium'),
    fontFace('NotoSans', 700, '/fonts/NotoKR/NotoSansKR-Bold'),
    fontFace('NotoSans', 900, '/fonts/NotoKR/NotoSansKR-Black'),
  ],

  // Transition Default
  tranDuration: '300ms',
};
