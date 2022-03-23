import styled from 'styled-components';
import { Page, PageProps } from '@/lib/types';
import { CenterBlock, Content } from '@/components/blocks/BaseBlock';
import ImageText1 from '@/components/blocks/ImageText1';
import H1WithDesc from '@/components/blocks/H1WithDesc';
import SixImages from '@/components/blocks/SixImages';
import { H1 } from '@/components/elements/Header';
import { ProductCard, ProductCards } from '@/components/elements/ProductCard';
import { media } from '@/lib/styled/media';

type Props = {
  //
};

const TopProduct = styled.div`
  padding: 30px 0px 10px;

  H1 {
    margin-bottom: -30%;
  }

  .desc {
    padding: 0 30px;
    color: #333;
    font-size: 18px;
    line-height: 1.67;
    text-align: center;
  }

  .line {
    width: 80%;
    height: 4px;
    margin: 70px auto 0;
    background-color: #dfdfdf;
  }

  ${media.big} {
    padding: 80px 0 10px;

    h1 {
      margin-bottom: 80px;
    }

    .desc {
      font-size: 20px;
      line-height: 2.5;
    }
  }
`;

const Product1 = styled.div``;
const Product2 = styled.div``;

const Circles = styled(CenterBlock)`
  display: flex;
  justify-content: center;
`;

const CircleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 230px;
  height: 230px;
  border: 8px solid #d1d6da;
  border-radius: 50%;
  color: #d1d6da;
  font-size: 30px;
  line-height: 1.2;
  text-align: center;

  :not(:first-child) {
    margin-left: 100px;
  }

  ::before {
    content: '';
    position: absolute;
    left: 18px;
    right: 18px;
    top: 18px;
    bottom: 18px;
    border: 4px solid #d1d6da;
    border-radius: 50%;
  }
`;

const ThreeLinksContainer = styled.div`
  padding: 30px 0 10px;

  a {
    display: block;
    margin-bottom: 15px;
    color: #ca2e26;
    font-size: 16px;
    text-align: center;
  }

  ${media.big} {
    display: flex;
    justify-content: center;
    padding: 40px 0;

    a {
      margin-bottom: 0;
      color: #e1373d;
      font-size: 22px;

      :not(:first-child) {
        margin-left: 80px;
      }
    }
  }
`;

const ThreeLinks = (): React.ReactElement => {
  const voidHref = '#';

  return (
    <ThreeLinksContainer>
      <a href={voidHref}>Download Packaging Information</a>
      <a href={voidHref}>To Become a Distributor</a>
      <a href={voidHref}>More about the Design</a>
    </ThreeLinksContainer>
  );
};

const Products: Page<Props> = (_props: PageProps<Props>) => {
  return (
    <>
      <TopProduct>
        <Content>
          <H1>
            Pure arctic water in award
            <br />
            winning design
          </H1>

          <ProductCards>
            <ProductCard
              image="/images/products/top-product-1.png"
              content="Aluminium bottles 473ml"
            />
            <ProductCard image="/images/products/top-product-2.png" content="Glass bottles 888ml" />
          </ProductCards>

          <div className="desc">
            Lofoten Arctic Water is available in still and sparkling.
            <br />
            <br className="hidden::big" />
            We have chosen to use blue bottles for our fantastic STILL WATER and white bottles for
            our SPARKLING WATER.
            <br />
            Our STILL WATER is the cleanest and freshest water without any addition or filtration.
            <br />
            Lofoten Arctic Water SPARKLING WATER is carbonated to provide the perfect combination of
            gently sparkling bubbles and fresh mountain water.
          </div>

          <div className="line" />
        </Content>
      </TopProduct>

      <Product1>
        <H1WithDesc className="gray" header="Aluminium bottle">
          Lofoten Arctic Water’s award winning aluminum bottle is a practical and stylish aluminum
          bottle of 473 ml.
          <br />
          When designing our new bottle we wanted to give the customer an alternative to plastic.
          <br />
          Therefore, we chose to make an aluminum bottle with a screw cap.
        </H1WithDesc>

        <ImageText1 src="/images/products/product1.jpg">
          By giving our bottle a screw off and on cap, you can easily take the bottle with you,
          refill it and use it several times.
          <br />
          <br />
          With our close connection to the sea and nature, we want to minimize emissions of
          microplastics into the sea. Aluminum has infinite life and maintains the same high quality
          every time it is recycled.
          <br />
          <br />
          Aluminum cools faster, is convenient to carry on and recycles forever. Our aluminum
          bottles are designed by Strømme Throndsen Design and manufactured by Ball Corporation. The
          world’s leading manufacturer of aluminum cans and bottles.
        </ImageText1>

        <Circles className="hidden::small">
          <CircleText>
            <div>
              chills
              <br />
              faster
            </div>
          </CircleText>
          <CircleText>
            <div>
              Great
              <br />
              on the go
            </div>
          </CircleText>
          <CircleText>
            <div>
              Recycles
              <br />
              forever
            </div>
          </CircleText>
        </Circles>

        <SixImages imagePrefix="products/insta-" />

        <ThreeLinks />
      </Product1>

      <Product2>
        <H1WithDesc className="gray" header="Glass bottle">
          Our award-winning 888 ml glass bottle is a great bottle that fits perfectly on the dinner
          table,
          <br />
          in the meeting room or in social gatherings with friends and family.
        </H1WithDesc>

        <ImageText1 src="/images/products/product2.jpg">
          The bottle is produced in flint glass which is characterized as heavy and durable glass
          with high gloss and clarity. We wanted the bottle to reflect the nature in Lofoten where
          the mountain rises from the crystal clear sea into the blue sky. The glass bottle has a
          large opening and is easy to pour from. Our glass bottle is designed by Strømme Throndsen
          Design.
        </ImageText1>

        <ThreeLinks />
      </Product2>
    </>
  );
};

Products.layoutProps = {
  title: 'Our Product',
};

export default Products;
