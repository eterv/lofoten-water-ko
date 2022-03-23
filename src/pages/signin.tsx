// 필요한 라이브러리 불러오기
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInArgs, SignInPayload } from '@/classes/user/user.schema';
import ErrorMessage from '@/components/Message/ErrorMessage';
import EmptyLayout from '@/layouts/EmptyLayout';
import { media } from '@/lib/styled/media';
import yup, { UserRules } from '@/lib/validator/yup';
import { Page, PageProps } from '@/lib/types';
import { useRouter } from 'next/router';

type Props = {
  //
};

type SignInResult = {
  signIn?: SignInPayload;
  signUp?: SignInPayload;
};

// yup 유효성 검증을 위한 스키마
const schema = yup.object().shape({
  // uid: UserRules.uid,
  pw: UserRules.pw,
});

// 로그인 시 데이터를 뮤테이션하기 위한 GraphQL 쿼리
const SIGNIN_MUTATION = gql`
  mutation T($uid: String!, $pw: String!) {
    signIn(user: { uid: $uid, pw: $pw }) {
      token
      user {
        id
        name
        isAdmin
      }
    }
  }
`;

// 회원가입 시 데이터를 뮤테이션하기 위한 GraphQL 쿼리
const SIGNUP_MUTATION = gql`
  mutation T($uid: String!, $pw: String!) {
    signUp(user: { uid: $uid, pw: $pw }) {
      token
      user {
        id
        name
      }
    }
  }
`;

// styled 방식으로 로그인 폼을 디자인
const SigninForm = styled.form`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  padding: 15px;

  .outline {
    padding: 30px;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin-bottom: 50px;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 5px;
    text-align: center;
  }

  ${media.big} {
    //
  }
`;

const FormArea = styled.div`
  .input {
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 20px;
    border: 1px solid #ccc;
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

  .buttons {
    margin-top: 25px;
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
      background: #0d7fdc;
    }
  }

  .err {
    border: 1px solid #dc0d15;
    text-align: left;
  }

  // 아래의 media.big 부분은 반응형 웹을 위한 shortcut 같은 기법
  // 실제로는 @media (min-width: (숫자)px) 값으로 대치된다.
  ${media.big} {
    max-width: 650px;

    input,
    button {
      height: 60px;
      line-height: 60px;
    }
  }
`;

const SignIn: Page<Props> = (_props: PageProps<Props>) => {
  // 페이지 시작 시에 아폴로 클라이언트 초기화, 라우터 사용
  const client = useApolloClient();
  const router = useRouter();
  const [redirect, setRedirect] = useState('');

  // URI 주소에 redirect 쿼리 문자열이 존재하면, 로그인이 성공한 후에
  // 해당 주소로 자동 이동 된다
  useEffect(() => {
    setRedirect(router.query.redirect ? (router.query.redirect as string) : '/');
  }, [setRedirect, router]);

  // yup 유효성 검증 초기화
  const { register, handleSubmit, errors } = useForm<SignInArgs>({
    resolver: yupResolver(schema) as any,
  });
  // apollo 를 사용한 GraphQL 사용 초기화
  const [signIn, { error: signInError }] = useMutation<SignInResult, SignInArgs>(SIGNIN_MUTATION);
  const [signUp] = useMutation<SignInResult, SignInArgs>(SIGNUP_MUTATION);

  // 로그인 버튼 눌리면 폼 전송이 일어나는데, 그 때 실행될 작업 선언
  // 최적화를 위해서 반복 렌더링시 중복선언되지 않도록 useCallback 사용
  const onSubmit = useCallback<SubmitHandler<SignInArgs>>(
    async (inputData, _e) => {
      try {
        const { data } = await signIn({
          variables: inputData,
        });

        // Apollo 캐시 데이터 리셋
        await client.resetStore();

        if (!data || !data.signIn) {
          throw new Error('Sign In error.');
        }

        await router.push(redirect);
      } catch (err) {
        // 오류는 signInError 에서 자동 처리
      }
    },
    [signIn, client, router, redirect]
  );

  // 회원 가입 부분도 구현했으나, 사실상 회원가입이 필요없고 관리자 계정만
  // 있으면 되므로 구현만 하고 사용은 하지 않음. 추후 필요하면 사용함.
  const handleSignUp = async () => {
    const f: HTMLFormElement = document.getElementById('form1') as any;
    const uid = f.uid.value;
    const pw = f.pw.value;
    console.log('sign', uid, pw);

    try {
      const { data } = await signUp({
        variables: { uid, pw },
      });
      console.log(data?.signUp);
    } catch (err) {
      console.log(err);
    }
  };

  // 렌더링 되는 html 부분 - 간단한 로그인 폼 부분
  return (
    <>
      <SigninForm id="form1" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="outline">
          <h1>LOGIN</h1>
          <FormArea>
            <div className="input">
              <input type="text" name="uid" placeholder="ID" ref={register} />
              {errors.uid && <ErrorMessage className="err">{errors.uid.message}</ErrorMessage>}
            </div>
            <div className="input">
              <input type="password" name="pw" placeholder="Password" ref={register} />
              {errors.pw && <ErrorMessage className="err">{errors.pw.message}</ErrorMessage>}
            </div>
            <div className="input buttons">
              <button type="submit">로그인</button>
              {signInError && <ErrorMessage className="err">{signInError.message}</ErrorMessage>}
              {false && (
                <button type="button" className="signup" onClick={handleSignUp}>
                  사용자 추가 테스트
                </button>
              )}
            </div>
          </FormArea>
        </div>
      </SigninForm>
    </>
  );
};

// 앱 전체의 레이아웃을 다루는 부분은 별도의 _app.tsx 에 구현되어 있다.
// 이 SignIn 페이지의 레이아웃 속성을 정의한다.
SignIn.layoutProps = {
  layout: EmptyLayout, // 레이아웃 종류
  title: '로그인', // 페이지 제목
};

export default SignIn;
