import styled from 'styled-components';

import InputBox from '../components/InputBox';

const SignIn = () => {
  return (
    <StyledSignIn className="flex-center">
      <Form className="flex-center">
        <FormTitle> Sign In</FormTitle>
        <InputBox title="e-mail" inputType="email-input" handleOnChange={() => {}}></InputBox>
        <InputBox title="password" inputType="password-input" handleOnChange={() => {}}></InputBox>
      </Form>
    </StyledSignIn>
  );
};

const StyledSignIn = styled.div`
  height: calc(100vh - 80px);
`;

const Form = styled.form`
  flex-direction: column;
  width: 360px;
`;

const FormTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 900;
`;

export default SignIn;
