import Link from 'next/link';
import styled from 'styled-components';
import { ChildrenProp, PageInfo } from '@/lib/types';
import { navList } from '@/config';
import { media } from '@/lib/styled/media';

type Props = ChildrenProp & {
  className?: string;
  pageInfo: PageInfo;
};

const Nav = styled.nav`
  display: flex;
  align-self: flex-end;
  opacity: 0;
  margin-left: auto;
  visibility: hidden;

  &.on {
    opacity: 1;
    visibility: visible;
  }
`;

const NavItem = styled.a`
  position: relative;
  padding: 20px 15px;
  color: #818181;
  font-size: 15px;
  text-align: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 10px;
    background: transparent;
    transition-duration: ${({ theme }) => theme.tranDuration};
  }

  &:hover::before,
  &.on::before {
    background: #ddd;
  }

  ${media.upL} {
    padding: 20px 30px;
  }
`;

const NavBar = ({ className, pageInfo }: Props): React.ReactElement => {
  return (
    <Nav className={className}>
      {navList.map((item) => (
        <Link passHref href={item.href} key={item.name}>
          <NavItem className={pageInfo.pageName === item.name ? 'on' : ''}>{item.text}</NavItem>
        </Link>
      ))}
    </Nav>
  );
};

export default NavBar;
