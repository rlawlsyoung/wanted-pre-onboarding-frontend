import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import InputBox from '../components/InputBox';
import AccountBtn from '../components/AccountBtn';

const SignIn = () => {
  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  }, []);

  const handlePwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  }, []);

  const handleSubmit = () => {};

  useEffect(() => {
    if (emailValue.includes('@') && pwValue.length > 8) setIsValid(true);
    else setIsValid(false);
    console.log(isValid);
  }, [emailValue, pwValue]);

  return (
    <StyledSignIn className="flex-center">
      <Form className="flex-center">
        <FormTitle> Sign In</FormTitle>
        <InputBox
          title="e-mail"
          inputType="email-input"
          placeholder="must include @"
          handleOnChange={handleEmailChange}></InputBox>
        <InputBox
          title="password"
          inputType="password-input"
          placeholder="at least 8 characters"
          handleOnChange={handlePwChange}></InputBox>
        <ToSignUp>
          Don't you have an account? <Link to="/signup"> Sign Up</Link>
        </ToSignUp>
        <AccountBtn text="Sign In" isValid={isValid} />
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

const ToSignUp = styled.p``;

export default SignIn;
