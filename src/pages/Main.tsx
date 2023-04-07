import styled from 'styled-components';

const Main = () => {
  return <StyledMain className="flex-center">환영합니다.</StyledMain>;
};

const StyledMain = styled.div`
  height: calc(100vh - 80px);
  color: gray;
  font-size: 26px;
  font-weight: 700;
`;

export default Main;
