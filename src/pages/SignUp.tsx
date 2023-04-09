import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import InputBox from '../components/InputBox';
import AccountBtn from '../components/AccountBtn';

import { URL } from '../Router';

const SignUp = () => {
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
    axios({
      url: `${URL}/auth/signup`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { email: emailValue, password: pwValue },
    })
      .then(() => {
        alert('Account creation complete');
        navigate('/signin');
      })
      .catch((err) => {
        alert('e-mail already exist');
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/todo');
  }, [navigate]);

  useEffect(() => {
    if (emailValue.includes('@') && pwValue.length >= 8) setIsValid(true);
    else setIsValid(false);
  }, [emailValue, pwValue]);

  return (
    <StyledSignUp>
      <Form className="flex-center" onSubmit={handleSubmit}>
        <FormTitle> Sign up</FormTitle>
        <InputBox
          title="e-mail"
          dataTestId="email-input"
          placeholder="must include @"
          inputType="email"
          handleOnChange={handleEmailChange}
        />
        <InputBox
          title="password"
          dataTestId="password-input"
          placeholder="at least 8 characters"
          inputType="password"
          handleOnChange={handlePwChange}></InputBox>
        <AccountBtn text="Sign up" dataTestId="signup-button" isValid={isValid} />
      </Form>
    </StyledSignUp>
  );
};

const StyledSignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  margin-top: 120px;
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

export default SignUp;
