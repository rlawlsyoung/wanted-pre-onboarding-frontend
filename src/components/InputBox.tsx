import styled from 'styled-components';

interface InputProps {
  title: string;
  inputType: string;
  handleOnChange: () => void;
}

const InputBox: React.FC<InputProps> = ({ title, inputType, handleOnChange }) => {
  return (
    <StyledInput>
      <InputTitle>{title}</InputTitle>
      <Input data-testid={inputType} onChange={handleOnChange} />
    </StyledInput>
  );
};

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
`;

const InputTitle = styled.p`
  font-weight: 700;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 30px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-family: 'Pretendard';
`;

export default InputBox;
