import { FC, FCProps } from '@/lib/types';
import Message, { Props as MessageProps } from './Message';

type Props = MessageProps;

const ErrorMessage: FC<Props> = ({ className, children }: FCProps<Props>) => {
  return <Message className={className}>{children}</Message>;
};

export default ErrorMessage;
