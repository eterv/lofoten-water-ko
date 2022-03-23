import Link from 'next/link';
import styled from 'styled-components';
import { FC, FCProps, PageInfo } from '@/lib/types';
import { navList } from '@/config';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
  pageInfo: PageInfo;
};

const NavButton = styled.button`
  display: block;
  width: 60px;
  height: 60px;
  margin-left: auto;
  appearance: none;
  border: 0;
  outline: none;
  background: transparent url('/images/icon-nav.png') center/cover no-repeat;
  cursor: pointer;
  visibility: hidden;

  &:focus {
    outline: none;
  }

  &.on {
    visibility: visible;
  }
`;

const NavContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: #f8f8f8;
  transition-duration: ${({ theme }) => theme.tranDuration};
  transform-origin: right;
  transform: scaleX(0);

  &.on {
    transform: scaleX(1);
  }
`;

const CloseButton = styled.button`
  display: block;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 60px;
  height: 60px;
  appearance: none;
  border: 0;
  outline: none;
  background: transparent url('/images/icon-close.png') center/cover no-repeat;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Nav = styled.nav`
  margin-top: 85px;
`;

const NavItem = styled.a`
  display: block;
  position: relative;
  padding: 10px 40px;
  color: #707070;
  font-size: 18px;
  line-height: 1.67;
`;

const NavBarMobile: FC<Props> = ({ className, pageInfo }: FCProps<Props>) => {
  const navContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    navContainer.current?.classList.remove('on');
  }, [pageInfo]);

  const onNavButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((_e) => {
    navContainer.current?.classList.add('on');
  }, []);

  const onCloseButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((_e) => {
    navContainer.current?.classList.remove('on');
  }, []);

  return (
    <>
      <NavButton className={className} onClick={onNavButtonClick} />
      <NavContainer ref={navContainer as any}>
        <CloseButton onClick={onCloseButtonClick} />
        <Nav>
          {navList.map((item) => (
            <Link passHref href={item.href} key={item.name}>
              <NavItem className={pageInfo.pageName === item.name ? 'on' : ''}>{item.text}</NavItem>
            </Link>
          ))}
        </Nav>
      </NavContainer>
    </>
  );
};

export default NavBarMobile;
