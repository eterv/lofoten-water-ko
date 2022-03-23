import Image from 'next/image';
import styled from 'styled-components';
import { ChildrenProp } from '@/lib/types';
import { media } from '@/lib/styled/media';

type Props = ChildrenProp & {
  alt?: string;
  invert?: boolean;
  src: string;
  wide?: boolean;
};

type ContainerProps = {
  invert?: boolean;
  wide?: boolean;
};

const Container = styled.div<ContainerProps>`
  .img {
    position: relative;
    padding-bottom: calc(100% * 9 / 16);
  }
  .text {
    padding: 20px 30px 30px;
    background-color: white;
    color: #707070;
    font-size: 18px;
    line-height: 30px;
  }

  ${media.big} {
    display: flex;
    align-items: stretch;
    height: 540px;

    .img {
      order: ${({ invert }) => (invert ? 2 : 0)};
      width: 50%;
      padding-bottom: 0;
    }
    .text {
      display: flex;
      align-items: center;
      width: 50%;
      padding: 20px 0;

      div {
        width: 100%;
        max-width: ${({ wide }) => (wide ? 620 : 600)}px;
        ${({ invert }) => (invert ? 'margin-left: auto' : '')};
        padding: 0 ${({ invert }) => (invert ? 40 : 60)}px;
      }
    }
  }
`;

const ImageText1 = ({ children, alt, invert, src, wide }: Props): React.ReactElement => {
  return (
    <Container invert={invert} wide={wide}>
      <div className="img">
        <Image alt={alt} src={src} layout="fill" objectFit="cover" />
      </div>
      <div className="text">
        <div>{children}</div>
      </div>
    </Container>
  );
};

export default ImageText1;
