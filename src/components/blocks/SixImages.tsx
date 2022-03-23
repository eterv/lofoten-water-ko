import styled from 'styled-components';
import Image from 'next/image';
import { H1 } from '@/components/elements/Header';
import { media } from '@/lib/styled/media';

type Props = {
  imagePrefix: string;
  showBottomBar?: boolean;
  showFollow?: boolean;
  showImageMask?: boolean;
};

const row = 6;

const Container = styled.div`
  padding: 0;

  h1 {
    margin: 0;
    padding: 30px 25px 20px;
  }

  .images {
    display: flex;
    flex-wrap: wrap;
  }
  .wrap {
    width: calc(100% / ${row / 2});
  }

  .img {
    position: relative;
    padding-bottom: 100%;

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(84, 89, 95, 0.6);
    }
  }
  .bar {
    height: 16px;
    background-color: #252c46;
  }

  ${media.big} {
    h1 {
      padding: 10px 0 30px;
    }

    .wrap {
      width: calc(100% / ${row});
    }

    .img {
    }
    .text {
      display: flex;
      align-items: center;
      width: 50%;
      max-width: 500px;
      padding: 20px 0 20px 60px;
      color: #707070;
    }
  }
`;

const SixImages = ({
  imagePrefix,
  showBottomBar,
  showFollow,
  showImageMask,
}: Props): React.ReactElement => {
  const imgs = [];
  for (let i = 0; i < row; i++) {
    imgs.push(
      <div className="img" key={i}>
        <Image alt="" src={`/images/${imagePrefix}${i}.jpg`} layout="fill" objectFit="cover" />
      </div>
    );
  }

  return (
    <Container className="six-images">
      {showFollow && <H1>Follow us @lofotenarcticwater</H1>}
      <div className="images">
        {[...Array(row).keys()].map((_, i) => (
          <div className="wrap" key={i.toString()}>
            <div className="img">
              <Image
                alt=""
                src={`/images/${imagePrefix}${i + 1}.jpg`}
                layout="fill"
                objectFit="cover"
              />
              {showImageMask && <div className="mask hidden::small" />}
            </div>
          </div>
        ))}
      </div>
      {showBottomBar && <div className="bar" />}
    </Container>
  );
};

export default SixImages;
