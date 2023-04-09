import styled from 'styled-components';

interface InputProps {
  title: string;
  dataTestId: string;
  inputType: string;
  placeholder: string;
  value?: string;
  maxLength?: number;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputProps> = ({
  title,
  dataTestId,
  inputType,
  placeholder,
  value,
  maxLength,
  handleOnChange,
}) => {
  return (
    <StyledInput>
      <InputTitle>{title}</InputTitle>
      <Input
        value={value}
        type={inputType}
        data-testid={dataTestId}
        onChange={handleOnChange}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
      />
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
  font-size: 16px;
`;

export default InputBox;
