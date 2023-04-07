import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import InputBox from '../components/InputBox';
import AccountBtn from '../components/AccountBtn';

const SignIn = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  }, []);

  const handlePwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
        email: emailValue,
        password: pwValue,
      })
      .then(() => {
        navigate('/todo');
      })
      .catch((err) => {
        alert(`account doesn't exist or wrong password`);
      });
  };

  useEffect(() => {
    if (emailValue.includes('@') && pwValue.length >= 8) setIsValid(true);
    else setIsValid(false);
  }, [emailValue, pwValue]);

  return (
    <StyledSignIn className="flex-center">
      <Form className="flex-center" onSubmit={handleSubmit}>
        <FormTitle> Sign In</FormTitle>
        <InputBox
          title="e-mail"
          dataTestId="email-input"
          placeholder="must include @"
          inputType="text"
          handleOnChange={handleEmailChange}></InputBox>
        <InputBox
          title="password"
          dataTestId="password-input"
          placeholder="at least 8 characters"
          inputType="password"
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
