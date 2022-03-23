import styled, { css } from 'styled-components';
import { H1 } from '@/components/elements/Header';
import { Content } from '@/components/blocks/BaseBlock';
import ImageText1 from '@/components/blocks/ImageText1';
import TopImage from '@/components/blocks/TopImage';
import TopH1 from '@/components/blocks/TopH1';
import { media } from '@/lib/styled/media';
import { Page, PageProps } from '@/lib/types';

type Props = {
  //
};

const tt = css`
  .ss {
    background-color: #0f5;
  }
`;

const ProductInfo = styled.div`
  padding: 30px 0;

  h1 {
    padding-bottom: 15px;
  }

  .content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .image {
    order: 2;
    padding-top: 30px;

    img {
      max-width: 100%;
    }
  }

  .desc {
    padding: 0 15px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 10px;
    color: #707070;
    font-size: 18px;
    line-height: 1.66;
  }
  li {
    position: relative;

    ::before {
      content: '-';
      position: absolute;
      left: -10px;
    }
  }

  ${media.big} {
    padding: 60px 0;

    h1 {
      padding-bottom: 50px;
    }

    .content {
      display: flex;
    }

    .content > * {
      width: 50%;
    }

    .image {
      order: 0;
      padding-top: 0;
    }

    .desc {
      padding: 0 40px;
    }
  }
`;

const Table1 = styled.table`
  width: 100%;
  margin-top: 30px;
  padding: 0;
  color: #707070;

  th,
  td {
    height: 40px;
    line-height: 40px;

    &:nth-child(2) {
      text-align: right;
    }
  }

  th {
    padding-bottom: 5px;
    border-bottom: 1px solid #707070;
    font-size: 22px;
    text-align: left;

    &:nth-child(1) {
      width: 75%;
    }
  }

  td {
    border-bottom: 1px solid #ccc;
    font-size: 18px;
  }

  ${media.big} {
    th,
    td {
      &:nth-child(2) {
        text-align: left;
      }
    }
  }
`;

const Source: Page<Props> = (_props: PageProps<Props>) => {
  return (
    <>
      <TopImage alt="Made by nature" src="/images/source/top-image.jpg">
        Made by <br className="hidden::big" />
        nature
      </TopImage>

      <TopH1>
        Lofoten Arctic Water
        <br />
        The Source
      </TopH1>

      <ImageText1 src="/images/source/image-text-1.jpg">
        The Lofoten Arctic Water source is located in the majestic mountains of the arctic Lofoten
        Islands. The water is renewed by glacial melt and snow all year from the surrounding
        mountains, and the pure rain during summer.
        <br />
        <br />
        The water is soft and has a super low TDS (Total Dissolved Solids). It is categorized as
        Superior, which indicates how protected the water is from its surroundings. This is
        determined by the water`s level of nitrate. The water has an amazing purity, noticeable
        texture and cleanness. A soft and smooth mouthfeel and is crisp and clean like the
        landscape.
      </ImageText1>

      <ProductInfo>
        <H1>Ice cold facts</H1>

        <Content className="content">
          <div className="image">
            <img alt="water" src="/images/home/water1.png" />
          </div>

          <div className="desc">
            <ul>
              <li>Our water is not distilled</li>
              <li>The source is only 9 kilometers from our facilities in Gravdal</li>
              <li>
                The unpolluted freshwater is also the local water source for 5000 inhabitants in
                Lofoten.
              </li>
              <li>TDS of 30 ppm</li>
              <li>4 times winner of BVest Taste Natural Still Water</li>
            </ul>

            <Table1 cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Mineral Content</th>
                  <th>mg/L</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sulfites</td>
                  <td>ND</td>
                </tr>
                <tr>
                  <td>Nitrate</td>
                  <td>ND</td>
                </tr>
                <tr>
                  <td>Magnesium</td>
                  <td>1.0</td>
                </tr>
                <tr>
                  <td>Calcium</td>
                  <td>1.7</td>
                </tr>
                <tr>
                  <td>Potassium</td>
                  <td>0.4</td>
                </tr>
                <tr>
                  <td>Bicarbonate</td>
                  <td>7.3</td>
                </tr>
                <tr>
                  <td>Sodium</td>
                  <td>7.6</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>Additionala data</strong>
                  </td>
                </tr>
                <tr>
                  <td>Total Dissolved Solids TDS</td>
                  <td>30ppm</td>
                </tr>
                <tr>
                  <td>pH</td>
                  <td>6.8</td>
                </tr>
              </tbody>
            </Table1>
          </div>
        </Content>
      </ProductInfo>
    </>
  );
};

Source.layoutProps = {
  title: 'The Source',
};

export default Source;
