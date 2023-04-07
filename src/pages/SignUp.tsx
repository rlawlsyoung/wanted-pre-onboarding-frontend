import styled from 'styled-components';

const SignUp = () => {
  return <StyledSignUp className="flex-center">Welcome to Todo List App :)</StyledSignUp>;
};

const StyledSignUp = styled.div`
  height: calc(100vh - 80px);
  color: gray;
  font-size: 26px;
  font-weight: 700;
`;

export default SignUp;
