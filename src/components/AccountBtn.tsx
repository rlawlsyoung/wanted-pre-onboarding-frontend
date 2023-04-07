import styled from 'styled-components';

interface AccountBtnProps {
  text: string;
}

const AccountBtn: React.FC<AccountBtnProps> = ({ text }) => {
  return <StyledAccountBtn className="flex-center">{text}</StyledAccountBtn>;
};

const StyledAccountBtn = styled.button`
  width: 120px;
  height: 45px;
  border: none;
  margin-top: 40px;
  background-color: black;
  color: white;
  font-family: 'Pretendard';
  font-size: 22px;
  cursor: pointer;
`;

export default AccountBtn;
