import styled from 'styled-components';

interface TodoBoxProps {
  text: string;
}

const TodoBox: React.FC<TodoBoxProps> = ({ text }) => {
  return (
    <StyledTodoBox>
      <Wrapper>
        <Dot /> <Text>{text}</Text>
      </Wrapper>
      <Wrapper>
        <Btn>Edit</Btn>
        <Btn>Remove</Btn>
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

const Text = styled.p``;

const Btn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  background-color: black;
  border-right: 1px solid white;
  border-left: 1px solid white;
  color: white;
  font-family: 'Pretendard';
  font-size: 12px;
  cursor: pointer;
`;

export default TodoBox;
