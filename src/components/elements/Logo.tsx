import Link from 'next/link';
import styled from 'styled-components';

type Props = React.ComponentProps<'div'> & {
  center?: boolean;
  isWhite?: boolean;
  width?: string;
};

const Container = styled.div<Props>`
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`;

const Logo = ({ className, center = false, isWhite, width = '250' }: Props): React.ReactElement => {
  return (
    <Container className={className} center={center}>
      <Link href="/" passHref>
        <a>
          <img src={`/images/logo-${isWhite ? 'w' : 'b'}.png`} alt="Lofeten Water" width={width} />
        </a>
      </Link>
    </Container>
  );
};

export default Logo;
