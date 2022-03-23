import styled from 'styled-components';
import Link from 'next/link';
import { Content } from '@/components/blocks/BaseBlock';
import Logo from '@/components/elements/Logo';
import { navList } from '@/config';
import { media } from '@/lib/styled/media';
import { PageInfo } from '@/lib/types';
import { useAppState } from '@/contexts/AppContext';

type Props = {
  pageInfo: PageInfo;
};

const Container = styled.footer`
  width: 100%;
  padding: 40px 0;

  transition-duration: ${({ theme }) => theme.tranDuration};

  &.on {
    background: white;
    box-shadow: 0 5px 5px rgba(50, 50, 50, 0.15);
  }

  .logo img {
    width: 160px;
  }

  ${media.big} {
    .logo img {
      width: 250px;
    }
  }
`;

const NavBar = styled.nav`
  display: flex;
  margin-top: 60px;
`;

const NavItem = styled.a`
  :not(:first-child) {
    margin-left: auto;
  }

  color: #333;
  font-size: 22px;
`;

const Copyright = styled.div`
  padding: 40px 35px 0;
  color: #7e7e7e;
  font-size: 12px;
  font-weight: 200;
  line-height: 22px;
  text-align: center;

  .sign {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 3px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23ccc' d='M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z'%3E%3C/path%3E%3C/svg%3E")
      center/contain no-repeat;
  }

  .signout {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='%23ccc' d='M423.5 0C339.5.3 272 69.5 272 153.5V224H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-71.1c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v80c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-80C576 68 507.5-.3 423.5 0z'%3E%3C/path%3E%3C/svg%3E");
  }

  ${media.big} {
    padding: 150px 15px 0;
    font-size: 22px;
    font-weight: normal;

    .sign {
      width: 22px;
      height: 22px;
    }
  }
`;

const Footer = ({ pageInfo }: Props): React.ReactElement => {
  const appState = useAppState();
  const user = appState.currentUser;

  const redirect = encodeURIComponent(pageInfo.pathName);
  const urlSignIn = `/signin${pageInfo.isHome ? '' : `?redirect=${redirect}`}`;

  return (
    <Container>
      <Content>
        <Logo className="logo" center />
        <NavBar className="hidden::small">
          {navList.map((item) => (
            <Link passHref href={item.href} key={item.name}>
              <NavItem>{item.text}</NavItem>
            </Link>
          ))}
        </NavBar>
        <Copyright>
          © 2020 {process.env.NEXT_PUBLIC_HOST}. ALL RIGHT RESERVED.
          <br className="hidden::big" />
          <span className="hidden::small">&nbsp;|&nbsp;</span>
          Serviced by Technobelly Company{' '}
          {user ? (
            <Link href="/signout">
              <a className="sign signout">&nbsp;</a>
            </Link>
          ) : (
            <Link href={urlSignIn}>
              <a className="sign signin">&nbsp;</a>
            </Link>
          )}
        </Copyright>
      </Content>
    </Container>
  );
};

export default Footer;
