import { media } from '@/lib/styled/media';
import styled from 'styled-components';

export const H1 = styled.h1`
  position: relative;
  margin: 0;
  color: #707070;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;

  ${media.big} {
    font-size: 50px;
    font-weight: normal;
  }
`;
