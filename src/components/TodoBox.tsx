import styled from 'styled-components';

interface TodoBoxProps {
  text: string;
  handleRemove: () => void;
}

const TodoBox: React.FC<TodoBoxProps> = ({ text, handleRemove }) => {
  return (
    <StyledTodoBox>
      <Wrapper>
        <Dot /> <Text>{text}</Text>
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

const Dot = styled.div`
  height: 5px;
  width: 5px;
  border-radius: 2.5px;
  background-color: black;
  margin: 10px 10px 10px 0;
`;

const Text = styled.p`
  width: calc(360px - 125px);
  font-size: 15.5px;
  word-break: break-all;
  overflow: hidden;
`;

const Btn = styled.button`
  width: 55px;
  height: 40px;
  border: none;
  background-color: black;
  border-right: 1.25px solid white;
  border-left: 1.25px solid white;
  color: white;
  font-family: 'Pretendard';
  font-size: 11px;
  cursor: pointer;
`;

export default TodoBox;
