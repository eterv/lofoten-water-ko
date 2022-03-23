import styled from 'styled-components';
import { BaseLayoutProps } from '@/lib/types';
import { media } from '@/lib/styled/media';
import Header from './Header';
import Footer from './Footer';

type Props = BaseLayoutProps & {
  //
};

type ContainerProps = {
  headerHeight: {
    big: number;
    small: number;
  };
  isHome?: boolean;
};

const Container = styled.main<ContainerProps>`
  padding-top: ${(props) => (props.isHome ? 0 : `${props.headerHeight.small}px`)};

  ${media.big} {
    padding-top: ${(props) => (props.isHome ? 0 : `${props.headerHeight.big}px`)};
  }
`;

const Layout = ({ children, pageInfo }: Props): React.ReactElement => {
  const headerHeight = Header.getHeight();

  return (
    <>
      <Header pageInfo={pageInfo} />
      <Container isHome={pageInfo?.isHome} headerHeight={headerHeight}>
        {children}
      </Container>
      <Footer pageInfo={pageInfo} />
    </>
  );
};

export default Layout;
