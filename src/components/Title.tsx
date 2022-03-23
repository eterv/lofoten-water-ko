import Head from 'next/head';

type Props = {
  suffix?: string;
  text?: string;
};

export const Title = ({ suffix, text }: Props): React.ReactElement => {
  const title = text ? `${text} - ${suffix}` : suffix;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="og:title" name="og:title" content={title} />
      <meta key="twitter:title" name="twitter:title" content={title} />
    </Head>
  );
};
