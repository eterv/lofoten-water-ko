import styled from 'styled-components';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Content } from '@/components/blocks/BaseBlock';
import { H1 } from '@/components/elements/Header';
import ErrorMessage from '@/components/Message/ErrorMessage';
import { ContactAddArgs, ContactAddPayload } from '@/classes/contact/contact.schema';
import { Page, PageProps } from '@/lib/types';
import { media } from '@/lib/styled/media';
import yup from '@/lib/validator/yup';
import { useAppState } from '@/contexts/AppContext';

type Props = {
  //
};

const schema = yup.object().shape({
  name: yup.string().label('이름').required().min(2).max(50),
  email: yup.string().label('이메일').required().email(),
  tel: yup
    .string()
    .label('전화번호')
    .required()
    .matches(
      /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
      '전화번호를 올바로 입력해주세요'
    ),
});

const contactList = [
  {
    name: 'Ivar S. Williksen',
    role: 'CEO Lofoten Arctic Water',
    email: 'Ivar@lofoten-water.com',
    contact: '+47 913 54 799',
  },
  {
    name: 'Nats Nevelius',
    role: 'Senior VP Sales and marketing',
    email: 'mats@lofoten-water.com',
    contact: '+47 909 19 965',
  },
  {
    name: 'Cecilie Q. Williksen',
    role: 'Sales and marketing coordinator',
    email: 'cecilie@lofoten-water.com',
    contact: '+47 934 60 277',
  },
  {
    name: 'Kjell-Hugo Pedersen',
    role: 'Production Manager',
    email: 'kjell-hugo@lofoten-water.com',
    contact: '+47 907 14 569',
  },
];

const CONTACT_ADD_MUTATION = gql`
  mutation ContactAddMutation($name: String!, $email: String!, $tel: String!) {
    contactAdd(contact: { name: $name, email: $email, tel: $tel }) {
      id
      name
    }
  }
`;

const ContactUs = styled.div`
  padding: 50px 0;

  h1 {
  }

  .contacts {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    color: #707070;
    line-height: 30px;
    text-align: center;

    .item {
      width: 100%;
      margin-bottom: 35px;
    }

    .name {
      font-size: 24px;
    }
    .desc {
      margin-top: 15px;
      font-size: 18px;
      font-weight: 200;
    }
  }

  ${media.big} {
    padding: 50px 0;

    h1 {
    }

    .contacts {
      .item {
        width: 25%;
      }
    }
  }
`;

const NewsletterForm = styled.form`
  padding: 30px 30px 50px;
  background: #252c46;
  text-align: center;

  h1 {
    color: white;
  }
  .desc {
    margin: 30px 0 45px;
    color: white;
    font-size: 20px;
    font-weight: 200;
    line-height: 34px;
  }

  ${media.big} {
    padding: 80px 15px 60px;
  }
`;

const FormArea = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;

  .input {
    margin-bottom: 10px;
  }
  .buttons {
    display: flex;

    button:not(:first-child) {
      margin-left: 10px;
    }
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 20px;
    border: 0;
    border-radius: 4px;
    color: #333;
    font-size: 18px;
    line-height: 45px;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #b7b7b7;
    }
  }

  button {
    display: block;
    width: 100%;
    height: 45px;
    appearance: none;
    background: #818a91;
    border: 0;
    border-radius: 4px;
    color: white;
    font-size: 18px;
    line-height: 45px;
    text-align: center;

    :hover {
      background: #dc0d15;
    }
  }

  .err {
    border: 1px solid #dc0d15;
    color: white;
    text-align: left;
  }

  ${media.big} {
    max-width: 650px;

    input,
    button {
      height: 60px;
      line-height: 60px;
    }
  }
`;

const Contact: Page<Props> = ({ router }: PageProps<Props>) => {
  const appState = useAppState();
  const user = appState.currentUser;

  const { register, handleSubmit, errors } = useForm<ContactAddArgs>({
    resolver: yupResolver(schema) as any,
  });
  const [contactAdd] = useMutation<ContactAddPayload, ContactAddArgs>(CONTACT_ADD_MUTATION);

  const onSubmit = useCallback<SubmitHandler<ContactAddArgs>>(
    async (inputData, e) => {
      const f: HTMLFormElement = e?.target;

      try {
        const { data } = await contactAdd({
          variables: inputData,
        });

        if (!data || !data.contactAdd) {
          throw new Error('Contact add error.');
        }

        // eslint-disable-next-line no-alert
        alert(
          `${data.contactAdd.name}님의 문의가 접수되었습니다. 빠른 시일안에 답변 드리겠습니다.`
        );

        f.reset();
        (f[0] as HTMLInputElement).focus();
        //
      } catch (err) {
        console.log(err);
      }
    },
    [contactAdd]
  );

  const handleListButtonClick = useCallback(() => {
    router.push('/contact/list');
  }, []);

  return (
    <>
      <ContactUs>
        <H1>Contact us</H1>
        <Content className="contacts">
          {contactList.map((item, i) => (
            <div className="item" key={i.toString()}>
              <div className="name">{item.name}</div>
              <div className="desc">
                {item.role}
                <br />
                {item.email}
                <br />
                {item.contact}
              </div>
            </div>
          ))}
        </Content>
      </ContactUs>

      <NewsletterForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <H1>Newsletter</H1>
        <div className="desc">
          Do you wish to receive newsletters from us?
          <br />
          Fill in your contact information under.
        </div>

        <FormArea>
          <div className="input">
            <input type="text" name="name" placeholder="이름" ref={register} />
            {errors.name && <ErrorMessage className="err">{errors.name.message}</ErrorMessage>}
          </div>
          <div className="input">
            <input type="email" name="email" placeholder="이메일" ref={register} />
            {errors.email && <ErrorMessage className="err">{errors.email.message}</ErrorMessage>}
          </div>
          <div className="input">
            <input type="text" name="tel" placeholder="전화번호" ref={register} />
            {errors.tel && <ErrorMessage className="err">{errors.tel.message}</ErrorMessage>}
          </div>
          <div className="input buttons">
            <button type="submit">보내기</button>
            {user && user.isAdmin && (
              <button type="button" className="list" onClick={handleListButtonClick}>
                목록
              </button>
            )}
          </div>
        </FormArea>
      </NewsletterForm>
    </>
  );
};

Contact.layoutProps = {
  title: 'Contact us',
};

export default Contact;
