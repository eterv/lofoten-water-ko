import { gql, useLazyQuery } from '@apollo/client';
import { User } from '@/classes/user/user.schema';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type UserCurrentPayload = {
  userCurrent: User;
};

const USER_CURRENT_QUERY = gql`
  query {
    userCurrent {
      id
      uid
      name
      isAdmin
    }
  }
`;

export function useGetCurrentUser(appDispatch: any): User | null {
  const router = useRouter();

  const [getCurrentUser, { data: userData }] = useLazyQuery<UserCurrentPayload>(USER_CURRENT_QUERY);

  useEffect(() => {
    getCurrentUser();
  }, [router]);

  useEffect(() => {
    if (typeof userData === 'undefined') return;
    appDispatch({ type: 'SET_CURRENT_USER', user: userData?.userCurrent || null });
  }, [userData]);

  return userData?.userCurrent || null;
}
