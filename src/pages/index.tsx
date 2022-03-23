import { ApolloQueryResult, gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { CenterBlock } from '@/components/blocks/BaseBlock';
import H1WithDesc from '@/components/blocks/H1WithDesc';
import ImageText1 from '@/components/blocks/ImageText1';
import SixImages from '@/components/blocks/SixImages';
import { H1 } from '@/components/elements/Header';
import { initializeApollo } from '@/graphql/client';
import { media } from '@/lib/styled/media';
import { Page, PageProps } from '@/lib/types';
import { User } from '@/classes/user/user.schema';

interface ViewersData {
  viewers: User[];
}

type Props = {
  res1: ApolloQueryResult<ViewersData>;
};

const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewers(name: "Lu") {
      id
      name
      email
    }
  }
`;

const MainBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('/images/home/bg.jpg') center/cover no-repeat;

  img {
    position: absolute;
    left: 10%;
    bottom: -100px;
    width: 80%;
  }

  ${media.big} {
    background-attachment: fixed;

    img {
      left: 50%;
      bottom: -120px;
      width: 480px;
    }
  }
`;

const Title1 = styled.div`
  padding: 130px 10px 15px;
  text-align: center;

  .t {
    color: #ca2e26;
    font-size: 36px;
    line-height: 1.5;
  }

  ${media.big} {
    padding-bottom: 55px;

    .t {
      color: #dc0d15;
      font-size: 90px;
    }
  }
`;

const OurFamily = styled(CenterBlock)`
  position: relative;
  padding: 30px 20px;
  text-align: center;
  background: url('/images/home/our-family-bg.jpg') center/cover no-repeat;

  ::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.75;
    background-color: #d4d4d4;
  }

  .t {
    position: relative;
    color: #707070;
  }

  .water {
    position: relative;
    max-width: 80%;
    margin-top: 40px;
  }

  ${media.big} {
    padding: 20px 15px;

    ::before {
      opacity: 0.9;
    }

    .t {
      font-size: 50px;
    }

    .water {
      margin-top: 20px;
      max-width: 750px;
    }
  }
`;

const Sustainability = styled(H1WithDesc)`
  a {
    color: #cc3366;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #cde;
  color: black;
`;

const Button = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const Home: Page<Props> = ({ res1 }: PageProps<Props>) => {
  // useApolloClient().resetStore();
  // const res1 = useQuery(VIEWER_QUERY);
  const viewers: User[] = res1.data?.viewers;

  if (res1.error) {
    return <p>{res1.error.message}</p>;
  }

  /*
  (async () => {
    const res = await fetch('/api/hello');
    const json = await res.json();
    console.log(json.name);
  })(); */

  return (
    <>
      <MainBackground>
        <img alt="" src="/images/home/water1.png" />
      </MainBackground>
      <Title1>
        <div className="t">Made by nature</div>
      </Title1>
      <ImageText1 src="/images/home/image-text-1.jpg">
        Lofoten Arctic Water is a natural premium water from Norway’s Lofoten Islands, located north
        of the Arctic Circle between the 68`th and 69´th parallels. The goal of the Lofoten Arctic
        Water team is to bring the experience of fresh, unpolluted water to the consumers worldwide.
        Situated at the ocean we must help to prevent microplastic to reach the ocean and also focus
        on the possibility to not only recycle but reuse.
      </ImageText1>

      <OurFamily>
        <H1>Our Family</H1>
        <img className="water" alt="" src="/images/home/water1.png" />
      </OurFamily>

      <Sustainability className="gray sustainability" header="Sustainability">
        At Lofoten Arctic Water, we are concerned about the environment, and want to make our
        production as environmentally friendly as possible. If you want to read more about our
        measures to help the environment.{' '}
        <Link href="/sustainability">
          <a>Click here.</a>
        </Link>
      </Sustainability>

      <SixImages imagePrefix="home/insta-" showBottomBar showFollow showImageMask />

      {false && (
        <Wrapper>
          <Button>버튼1</Button>

          {viewers &&
            viewers.map((user, index) => (
              <div key={user.id}>
                <div>{index}</div>
                <div>이름: {user.name || '이름없음'}</div>
                <div>이메일: {user.email}</div>
              </div>
            ))}
        </Wrapper>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const apolloClient = initializeApollo();

  const res1 = await apolloClient.query({
    query: VIEWER_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      res1,
    },
  };
};

export default Home;
