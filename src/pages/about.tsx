import styled from 'styled-components';
import ImageText1 from '@/components/blocks/ImageText1';
import SixImages from '@/components/blocks/SixImages';
import TopImage from '@/components/blocks/TopImage';
import TopH1 from '@/components/blocks/TopH1';
import { media } from '@/lib/styled/media';
import { Page, PageProps } from '@/lib/types';
import H1WithDesc from '@/components/blocks/H1WithDesc';

type Props = {
  //
};

const Table1 = styled.table`
  width: 100%;
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
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    font-size: 13px;
    letter-spacing: -0.5px;
    line-height: 20px;
  }

  ${media.big} {
    th,
    td {
      line-height: 40px;

      &:nth-child(2) {
        text-align: right;
      }
    }

    td {
      padding: 0;
      font-size: 15px;
      line-height: 40px;
    }
  }
`;

const Container = styled.div`
  .six-images {
    h1 {
      padding-top: 50px;
    }
  }
`;

const About: Page<Props> = (_props: PageProps<Props>) => {
  return (
    <Container>
      <TopImage alt="Made by nature" src="/images/about/top-image.jpg">
        Made by <br className="hidden::big" />
        nature
      </TopImage>

      <TopH1>
        About Lofoten <br className="hidden::big" />
        Arctic Water
      </TopH1>

      <ImageText1 src="/images/about/image-text-1.jpg">
        The bottling plant is state-of-the-art and has the capacity to fill 1,500 bottles per hour.
        Our supplier of machines is Framax, they are a leading company in the production of complete
        “Turn Key” production lines for the bottling and packaging industry.
        <br />
        <br />
        In the autumn of 2020, the plant has undergone a major restructuring, to accommodate our new
        Alumi-Tek® bottles. As of October 2020, Lofoten Arctic Water is the only manufacturer that
        can bottle Alumi-Tek® bottles in Europe.
      </ImageText1>

      <H1WithDesc className="gray" header="Our Awards">
        Lofoten Arctic Water has many times been recognized and awarded for the water,
        <br className="hidden::small" />
        bottle design and packaging.
      </H1WithDesc>

      <ImageText1 src="/images/about/image-text-2.jpg" invert wide>
        <Table1 cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th colSpan={2}>Taste</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Best Natural Still Water</td>
              <td>@ Zenith Global Water Awards 2020</td>
            </tr>
            <tr>
              <td>Best Natural Sparkling Water</td>
              <td>@ Zenith Global Water Awards 2020</td>
            </tr>
            <tr>
              <td>Best Natural Sparkling Water</td>
              <td>@ Zenith Global Water Awards 2019</td>
            </tr>
            <tr>
              <td>Bronze, Best taste, Natural Still ater</td>
              <td>@The 8th Water tasting, China 2019</td>
            </tr>
            <tr>
              <td>Silver, Best taste, Natural Sparkling Water</td>
              <td>@FineWater Sweden 2019</td>
            </tr>
            <tr>
              <td>Awarded France&#39;s Gourmet Water 2019</td>
              <td>@ AVPA France 2019</td>
            </tr>
            <tr>
              <td>Gold, Best taste, Natural Still Water</td>
              <td>@FineWater China 2017</td>
            </tr>
            <tr>
              <td>Best Taste, Natural Still Water</td>
              <td>@ Zenith Global Water Awards 2017</td>
            </tr>
            <tr>
              <td>Best Taste, Natural Still Water</td>
              <td>@ Zenith Global Water Awards 2016</td>
            </tr>
          </tbody>
        </Table1>
      </ImageText1>

      <ImageText1 src="/images/about/image-text-3.jpg" wide>
        <Table1 cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th colSpan={2}>Design</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Best in Can</td>
              <td>@ Zenith Global Water Awards 2020</td>
            </tr>
            <tr>
              <td>SIlver, Best Bottle Design, Water</td>
              <td>@ Pentawards 2020</td>
            </tr>
            <tr>
              <td>Best Cap/Clouser</td>
              <td>@ Zenith Global Water Awards 2019</td>
            </tr>
            <tr>
              <td>Best Packaging 2018</td>
              <td>@ Zenith Global Water Awards 2018</td>
            </tr>
            <tr>
              <td>Best packaging/Label</td>
              <td>@ Zenith Global Water Awards 2017</td>
            </tr>
            <tr>
              <td>Silver, Best Bottle Design, Water</td>
              <td>@ Pentawards 2017</td>
            </tr>
            <tr>
              <td>Platinum, Best Bottle Design, Water</td>
              <td>@ A&#39;Design Award &amp; Competition 2017</td>
            </tr>
          </tbody>
        </Table1>
      </ImageText1>

      <SixImages imagePrefix="home/insta-" showBottomBar showFollow />
    </Container>
  );
};

About.layoutProps = {
  title: 'About us',
};

export default About;
