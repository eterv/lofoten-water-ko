import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    contentWidth: number;

    fonts?: string[];

    tranDuration: string;
  }
}
