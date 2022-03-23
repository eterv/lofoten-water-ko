import styled from 'styled-components';
import { FC, FCProps } from '@/lib/types';

export type Props = {
  //
};

const Container = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Message: FC<Props> = ({ className, children }: FCProps<Props>) => {
  return <Container className={className}>{children}</Container>;
};

export default Message;
