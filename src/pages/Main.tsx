import styled from 'styled-components';

const Main = () => {
  return <StyledMain className="flex-center">Welcome to Todo List App :)</StyledMain>;
};

const StyledMain = styled.div`
  height: calc(100vh - 80px);
  margin-top: 80px;
  color: gray;
  font-size: 26px;
  font-weight: 700;
`;

export default Main;
