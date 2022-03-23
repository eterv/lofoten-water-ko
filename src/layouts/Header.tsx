import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Content } from '@/components/blocks/BaseBlock';
import Logo from '@/components/elements/Logo';
import { EffectFn, useWindowScroll } from '@/hooks/useScroll';
import NavBar from '@/components/NavBar/NavBar';
import { PageInfo } from '@/lib/types';
import { media } from '@/lib/styled/media';
import { cls } from '@/lib/utils/class';
import NavBarMobile from '@/components/NavBar/NavBarMobile';

type HeaderComponent<P> = ((props: P) => React.ReactElement) & {
  getHeight: () => {
    big: number;
    small: number;
  };
};

type Props = {
  pageInfo: PageInfo;
};

const height = {
  big: 120,
  small: 85,
};

const Container = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: ${height.small}px;
  z-index: 1;
  background: transparent;
  transition-duration: ${({ theme }) => theme.tranDuration};

  &.on {
    background: #f8f8f8;
    box-shadow: 0 5px 5px rgba(50, 50, 50, 0.15);
  }

  .logo img {
    width: 100px;
  }

  ${media.big} {
    height: ${height.big}px;

    .logo img {
      width: 130px;
    }
  }
`;

const Wrapper = styled(Content)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;
`;

const Header: HeaderComponent<Props> = ({ pageInfo }: Props) => {
  const [show, setShow] = useState(false);
  const [classShow, setClassShow] = useState('');

  const onWindowScroll: EffectFn = ({ current }) => {
    if (!pageInfo.isHome) return;

    const isShow = current.y > 25;
    setShow(isShow);
    setClassShow(isShow ? 'on' : '');
  };

  useWindowScroll(onWindowScroll, 100, [pageInfo]);

  useEffect(() => {
    setTimeout(() => {
      const isShow = !pageInfo.isHome;
      setShow(isShow);
      setClassShow(isShow ? 'on' : '');
    }, 0);
  }, [pageInfo]);

  return (
    <Container className={classShow}>
      <Wrapper>
        <Logo className="logo" isWhite={!show} width="130" />
        <NavBar className={cls(classShow, 'hidden::small')} pageInfo={pageInfo} />
        <NavBarMobile className={cls(classShow, 'hidden::big')} pageInfo={pageInfo} />
      </Wrapper>
    </Container>
  );
};

Header.getHeight = () => height;

export default Header;
