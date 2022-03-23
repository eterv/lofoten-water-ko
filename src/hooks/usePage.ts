import { PageInfo } from '@/lib/types';
import { useRouter } from 'next/router';

export const usePageInfo = (): PageInfo => {
  const router = useRouter();
  const pathName = router.pathname;

  // 맨 앞에 슬래시(/) 기호를 제거한다.
  const pageName = pathName.substring(1);
  const isHome = !pageName;

  return {
    isHome,
    pageName,
    pathName,
    router,
  };
};
