import { BaseLayoutProps } from '@/lib/types';

type Props = BaseLayoutProps & {
  //
};

const EmptyLayout = ({ children }: Props): React.ReactElement => {
  return <>{children}</>;
};

export default EmptyLayout;
