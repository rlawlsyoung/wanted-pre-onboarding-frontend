import styled from 'styled-components';

const Wrong = () => {
  return <StyledWrong className="flex-center">Wrong Access</StyledWrong>;
};

const StyledWrong = styled.div`
  height: calc(100vh - 80px);
  margin-top: 80px;
  color: gray;
  font-size: 26px;
  font-weight: 700;
`;

export default Wrong;
