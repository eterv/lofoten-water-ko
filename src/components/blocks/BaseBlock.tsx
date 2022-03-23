import { media } from '@/lib/styled/media';
import styled from 'styled-components';

export const BaseBlock = styled.div`
  padding: 20px 15px;

  ${media.big} {
    padding: 50px 20px;
  }
`;

export const CenterBlock = styled(BaseBlock)`
  text-align: center;
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.contentWidth}px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
`;
