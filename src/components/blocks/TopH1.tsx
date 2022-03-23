import styled from 'styled-components';
import { H1 } from '@/components/elements/Header';
import { ChildrenProp } from '@/lib/types';
import { media } from '@/lib/styled/media';

type Props = ChildrenProp & {
  //
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  text-align: center;

  ${media.big} {
    height: 250px;
  }
`;

const TopH1 = ({ children }: Props): React.ReactElement => {
  return (
    <Container>
      <H1>{children}</H1>
    </Container>
  );
};

export default TopH1;
