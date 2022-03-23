import dayjs from 'dayjs';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Content } from '@/components/blocks/BaseBlock';
import { H1 } from '@/components/elements/Header';
import { media } from '@/lib/styled/media';
import { Page, PageProps } from '@/lib/types';
import { Contact } from '@/classes/contact/contact.schema';
import { cls } from '@/lib/utils/class';
import { useAppState } from '@/contexts/AppContext';
import { useEffect } from 'react';

type Props = {
  //
};

type ContactListPayload = {
  contactList: Contact[];
  contactCountAll: number;
};

const Q_CONTACT_LIST = gql`
  query contactList($page: Int!, $limit: Int!) {
    contactList(page: $page, limit: $limit) {
      id
      name
      email
      tel
      dtCreated
    }
    contactCountAll
  }
`;

const PageContainer = styled.div`
  padding: 50px 0;
`;

const List = styled.div`
  padding: 40px 0;

  .head,
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;

    & > div {
      width: 100%;
      padding: 5px;
    }
  }

  .head {
    border-bottom: 2px solid #888;
    font-weight: bold;
  }

  ${media.big} {
    .head,
    .item {
      padding: 0;

      & > div {
        width: 25%;
        padding: 15px;
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  color: #888;
  font-size: 18px;

  .page {
    appearance: none;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &.on {
      text-decoration: underline;
    }

    &:hover {
      color: #333;
    }

    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`;

const ContactListPage: Page<Props> = ({ pathName, router }: PageProps<Props>) => {
  const { currentUser: user, loaded } = useAppState();
  useEffect(() => {
    if (!loaded) return;
    if (user === null) {
      router.push(`/signin?redirect=${encodeURIComponent(pathName)}`);
    }
  }, [loaded, user]);

  const page = router.query.page ? parseInt(router.query.page as string, 10) : 1;
  const limit = 15;

  const { error, data, fetchMore, loading } = useQuery<ContactListPayload>(Q_CONTACT_LIST, {
    variables: {
      page,
      limit,
    },
  });

  useEffect(() => {
    (async () => {
      const newPage = router.query.page ? parseInt(router.query.page as string, 10) : 1;

      await fetchMore({
        variables: {
          page: newPage,
          limit,
        },
      });
    })();
  }, [router, router.query.page]);

  if (error) {
    return (
      <PageContainer>
        <div className="error">Error loading posts.</div>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="loading">Loading...</div>
      </PageContainer>
    );
  }

  const { contactCountAll } = data as ContactListPayload;
  const { contactList } = data as ContactListPayload;

  const totalPages = Math.ceil(contactCountAll / limit);

  const handlePageClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const pg = +(e.currentTarget.textContent as string);

    router.push(
      {
        query: `page=${pg}`,
      },
      undefined,
      { shallow: true }
    );
  };

  if (!user) {
    return <></>;
  }

  return (
    <PageContainer>
      <Content>
        <H1>문의게시판</H1>

        <List>
          <div className="head">
            <div>이름</div>
            <div>이메일</div>
            <div>전화번호</div>
            <div>등록일시</div>
          </div>
          {contactList &&
            contactList.map((item, i) => (
              <div className="item" key={i.toString()}>
                <div className="name">{item.name}</div>
                <div>{item.email}</div>
                <div>{item.tel}</div>
                <div>{dayjs(item.dtCreated).format('YYYY-MM-DD HH:mm')}</div>
              </div>
            ))}
        </List>

        <Pagination>
          {totalPages &&
            [...Array(totalPages).keys()].map((_, i) => (
              <button
                type="button"
                className={cls('page', { on: page == i + 1 })}
                key={i.toString()}
                onClick={handlePageClick}
              >
                {i + 1}
              </button>
            ))}
        </Pagination>
      </Content>
    </PageContainer>
  );
};

ContactListPage.layoutProps = {
  title: '문의게시판',
};

export default ContactListPage;
