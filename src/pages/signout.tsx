import { useEffect } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import EmptyLayout from '@/layouts/EmptyLayout';
import { Page, PageProps } from '@/lib/types';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/contexts/AppContext';

type Props = {
  //
};

type SignOutResult = {
  signOut?: boolean;
};

const SIGNOUT_MUTATION = gql`
  mutation T {
    signOut
  }
`;

const SignOut: Page<Props> = (_props: PageProps<Props>) => {
  const client = useApolloClient();
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const [signOut] = useMutation<SignOutResult>(SIGNOUT_MUTATION);

  useEffect(() => {
    (async () => {
      await signOut();

      // Apollo 캐시 데이터 리셋
      await client.resetStore();

      // 앱 컨텍스트 현재 사용자 데이터 리셋
      appDispatch({ type: 'SET_CURRENT_USER', user: null });

      await router.push('/');
    })();
  }, [signOut, client, router]);

  return (
    <>
      <div>로그아웃 중...</div>
    </>
  );
};

SignOut.layoutProps = {
  layout: EmptyLayout,
  title: '로그아웃',
};

export default SignOut;
