import styled from 'styled-components';

interface AccountBtnProps {
  text: string;
  isValid: boolean;
}

const AccountBtn: React.FC<AccountBtnProps> = ({ text, isValid }) => {
  return (
    <StyledAccountBtn className="flex-center" disabled={!isValid}>
      {text}
    </StyledAccountBtn>
  );
};

const StyledAccountBtn = styled.button<{ disabled: boolean }>`
  width: 120px;
  height: 45px;
  border: none;
  margin-top: 40px;
  background-color: ${(props) => (props.disabled ? 'gray' : 'black')};
  color: white;
  font-family: 'Pretendard';
  font-size: 22px;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
`;

export default AccountBtn;
