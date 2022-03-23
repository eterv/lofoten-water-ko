import styled from 'styled-components';
import { Content } from '@/components/blocks/BaseBlock';
import { H1 } from '@/components/elements/Header';
import { ChildrenProp } from '@/lib/types';
import { media } from '@/lib/styled/media';

type Props = ChildrenProp & {
  className?: string;
  header: string;
  narrow?: boolean;
};

type DescProps = typeof Content & {
  narrow?: boolean;
};

const Container = styled.div`
  padding: 30px 0;
  text-align: center;

  ${media.big} {
    padding: 60px 0;
  }
`;

const Desc = styled<DescProps>(Content)`
  padding: 15px 40px 0;
  color: #333;
  font-size: 18px;
  line-height: 1.67;

  ${media.big} {
    ${({ narrow }) => (narrow ? 'max-width: 950px' : '')};
    padding: 30px 20px 0;
    font-size: 20px;
    line-height: 2;
  }
`;

const H1WithDesc = ({ className, children, header, narrow }: Props): React.ReactElement => {
  return (
    <Container className={className}>
      <H1>{header}</H1>
      <Desc narrow={narrow}>{children}</Desc>
    </Container>
  );
};

export default H1WithDesc;
