import Image from 'next/image';
import styled from 'styled-components';
import { ChildrenProp } from '@/lib/types';
import { media } from '@/lib/styled/media';

type Props = ChildrenProp & {
  alt: string;
  src: string;
};

const Container = styled.div`
  .img {
    position: relative;
    padding-bottom: 700px;
  }
  .text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 36px;
    font-weight: 500;
    text-shadow: 0 3px 10px rgba(0, 0, 0, 0.27);
    text-align: center;
    white-space: nowrap;
  }
  .bar {
    height: 16px;
    background: #252c46;
  }

  ${media.big} {
    .img {
    }
    .text {
      font-size: 90px;
    }
  }
`;

const TopImage = ({ children, alt, src }: Props): React.ReactElement => {
  return (
    <Container>
      <div className="img">
        <Image alt={alt} src={src} layout="fill" objectFit="cover" />
        <div className="text">{children}</div>
      </div>
      <div className="bar" />
    </Container>
  );
};

export default TopImage;
