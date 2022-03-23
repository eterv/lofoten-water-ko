import styled from 'styled-components';
import { FC, FCProps } from '@/lib/types';
import { useAppState } from '@/contexts/AppContext';

type Props = {
  //
};

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: white;
`;

const Loading: FC<Props> = ({ className }: FCProps<Props>) => {
  const { loaded } = useAppState();

  return <>{!loaded && <Container className={className} />}</>;
};

export default Loading;
