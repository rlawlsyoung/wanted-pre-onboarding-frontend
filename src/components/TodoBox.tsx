import { useState } from 'react';
import styled from 'styled-components';

interface TodoBoxProps {
  id: number;
  text: string;
  isCompleted: boolean;
  handleCheck: () => void;
  handleRemove: () => void;
}

const TodoBox: React.FC<TodoBoxProps> = ({ text, isCompleted, handleCheck, handleRemove }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <StyledTodoBox>
      <Wrapper>
        <CheckBox type="checkbox" checked={isCompleted} onChange={handleCheck} />{' '}
        <Text>{text}</Text>
      </Wrapper>
      <Wrapper>
        <Btn data-testid="modify-button">Edit</Btn>
        <Btn data-testid="delete-button" onClick={handleRemove}>
          Remove
        </Btn>
      </Wrapper>
    </StyledTodoBox>
  );
};

const StyledTodoBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  margin: 10px 10px 10px 0;
`;

const Text = styled.p`
  width: calc(360px - 133px);
  font-size: 15.5px;
  word-break: break-all;
  overflow: hidden;
`;

const Btn = styled.button`
  width: 55px;
  height: 40px;
  border: none;
  background-color: black;
  border-left: 2.5px solid white;
  color: white;
  font-family: 'Pretendard';
  font-size: 11px;
  cursor: pointer;
`;

export default TodoBox;
