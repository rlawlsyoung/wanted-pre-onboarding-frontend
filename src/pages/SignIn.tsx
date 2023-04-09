import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import InputBox from '../components/InputBox';
import AccountBtn from '../components/AccountBtn';

import { URL } from '../Router';

interface SignInProps {
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setIsLogIn }) => {
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

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(`${URL}/auth/signin`, {
          email: emailValue,
          password: pwValue,
        })
        .then((res) => {
          localStorage.setItem('token', res.data.access_token);
          setIsLogIn(true);
          navigate('/todo');
        })
        .catch((err) => {
          alert(`account doesn't exist or wrong password`);
        });
    },
    [emailValue, pwValue, setIsLogIn, navigate],
  );

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/todo');
  }, [navigate]);

  useEffect(() => {
    if (emailValue.includes('@') && pwValue.length >= 8) setIsValid(true);
    else setIsValid(false);
  }, [emailValue, pwValue]);

  return (
    <StyledSignIn>
      <Form className="flex-center" onSubmit={handleSubmit}>
        <FormTitle> Sign In</FormTitle>
        <InputBox
          title="e-mail"
          dataTestId="email-input"
          placeholder="must include @"
          inputType="text"
          handleOnChange={handleEmailChange}
        />
        <InputBox
          title="password"
          dataTestId="password-input"
          placeholder="at least 8 characters"
          inputType="password"
          handleOnChange={handlePwChange}></InputBox>
        <ToSignUp>
          Don't you have an account? <Link to="/signup"> Sign Up</Link>
        </ToSignUp>
        <AccountBtn text="Sign In" dataTestId="signin-button" isValid={isValid} />
      </Form>
    </StyledSignIn>
  );
};

const StyledSignIn = styled.div`
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

const ToSignUp = styled.p``;

export default SignIn;
