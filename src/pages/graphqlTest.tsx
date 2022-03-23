import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import styled from 'styled-components';
import yup from '@/lib/validator/yup';
import ErrorMessage from '@/components/Message/ErrorMessage';
import { SignUpArgs, SignUpPayload } from '@/classes/user/user.schema';

const ADD_MUTATION = gql`
  mutation UserAddMutation($name: String!, $email: String!) {
    userAdd(user: { name: $name, email: $email }) {
      id
      name
    }
  }
`;

const schema = yup.object().shape({
  name: yup.string().label('이름').required().min(2).max(4),
  email: yup.string().label('이메일').required().min(4),
});

const Products = (): React.ReactElement => {
  const { register, handleSubmit, errors } = useForm<SignUpArgs>({
    resolver: yupResolver(schema) as any,
  });
  const [userAdd] = useMutation<SignUpPayload, SignUpArgs>(ADD_MUTATION);

  const [t, setT] = useState('');

  /* const s1 = 11;
  useEffect(() => {
    console.log('Product effect', n);
    setN((nn) => nn + 1);
  }, []); */

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setT(e.target.value);
  }, []);

  const onSubmit = useCallback<SubmitHandler<SignUpArgs>>(
    async (inputData) => {
      try {
        const { data } = await userAdd({
          variables: inputData,
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    [userAdd]
  );

  useEffect(() => {
    // console.log('DB 데이터 생성.');
    // setN((n2) => n2 + 1);
  }, []);

  return (
    <>
      <div>
        <input type="text" value={t} onChange={onInputChange} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="name" defaultValue="Lu" placeholder="Name" ref={register} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <input name="email" placeholder="Email" ref={register} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <button type="submit">추가</button>
        </div>
      </form>
    </>
  );
};

export default Products;
