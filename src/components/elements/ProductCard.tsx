import styled from 'styled-components';
import Image from 'next/image';
import { media } from '@/lib/styled/media';

type Props = {
  image: string;
  content: string;
};

export const ProductCards = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 100%;
    margin-bottom: 40px;
  }

  ${media.big} {
    margin-left: -50px;
    margin-right: -50px;

    & > div {
      width: 50%;
      margin-bottom: 0;
      padding: 0 50px;
    }
  }
`;

const Container = styled.div`
  text-align: center;
`;

const CardMedia = styled.div`
  position: relative;
  padding-bottom: 100%;
`;

const CardContent = styled.div`
  margin-top: 30px;
  color: #707070;
  font-size: 18px;
  line-height: 28px;

  ${media.big} {
    font-size: 20px;
    line-height: 38px;
  }

  .arrow {
    margin-top: 30px;
  }
`;

export const ProductCard = ({ content, image }: Props): React.ReactElement => {
  return (
    <Container>
      <CardMedia>
        <Image src={image} layout="fill" />
      </CardMedia>
      <CardContent>
        <div>
          {content}
          <br />
          Read more
        </div>
        <div className="arrow">
          <img src="/images/products/top-product-arrow.png" alt="" width="80" />
        </div>
      </CardContent>
    </Container>
  );
};
