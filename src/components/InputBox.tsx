import styled from 'styled-components';

interface InputProps {
  title: string;
  isEmail: boolean;
  handleOnChange: () => void;
}

const InputBox: React.FC<InputProps> = ({ title, isEmail, handleOnChange }) => {
  return (
    <StyledInput>
      <InputTitle>{title}</InputTitle>
      {isEmail ? (
        <Input data-testid="email-input" onChange={handleOnChange} />
      ) : (
        <Input data-testid="password-input" onChange={handleOnChange} />
      )}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputTitle = styled.p`
  font-weight: 700;
  margin: 5px;
`;

const Input = styled.input`
  height: 30px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-family: 'Pretendard';
`;

export default InputBox;
