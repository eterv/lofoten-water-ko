import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { Title } from '@/components/Title';
import { AppProvider } from '@/contexts/AppContext';
import { useApollo } from '@/graphql/client';
import { usePageInfo } from '@/hooks/usePage';
import DefaultLayout from '@/layouts/Layout';
import { BaseLayout, Page } from '@/lib/types';
import { GlobalStyle } from '@/styles/globals';
import { LofotenWaterTheme } from '@/styles/themes';
import Loading from '@/components/Loading';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  // const apolloClient = useApollo(pageProps);
  const apolloClient = useApollo(pageProps.initialApolloState);

  // 페이지 정보 가져오기
  const pageInfo = usePageInfo();

  // 레이아웃이 특별히 지정되어 있지 않다면 기본 레이아웃을 사용한다.
  const PageComponent = Component as Page;
  const Layout: BaseLayout = PageComponent.layoutProps?.layout ?? DefaultLayout;

  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <Title suffix={process.env.NEXT_PUBLIC_TITLE} text={PageComponent.layoutProps?.title} />
        <Head>
          <link rel="icon" href="/favicon.png" sizes="32x32" />
          <link rel="icon" href="/favicon.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta name="description" content="로포튼 워터는 아름다운 최상의 물을 제공합니다" />
          <meta property="og:description" content="로포튼 워터는 아름다운 최상의 물을 제공합니다" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:site_name" content="로포튼 워터" />
          <meta property="og:image" content="https://lofoten-water.kr/images/logo-b.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://lofoten-water.kr" />
        </Head>
        <ThemeProvider theme={LofotenWaterTheme}>
          <GlobalStyle />
          <Layout pageInfo={pageInfo}>
            <Loading />
            <Component {...pageProps} {...pageInfo} />
          </Layout>
        </ThemeProvider>
      </AppProvider>
    </ApolloProvider>
  );
};

export default App;
