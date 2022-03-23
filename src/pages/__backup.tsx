import styled from 'styled-components';
import { media } from '@/lib/styled/media';
import { Page, PageProps } from '@/lib/types';

type Props = {
  //
};

const C = styled.div`
  //

  ${media.big} {
    //
  }
`;

const _P: Page<Props> = (_props: PageProps<Props>) => {
  return (
    <>
      <C />
    </>
  );
};

_P.layoutProps = {
  title: '?',
};

export default _P;
