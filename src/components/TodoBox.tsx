import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { TodoTypes } from '../pages/Todo';
import { URL } from '../Router';

interface TodoBoxProps {
  todoObj: TodoTypes;
  todoList: TodoTypes[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoBox: React.FC<TodoBoxProps> = ({ todoObj, todoList, setTodoList }) => {
  const { id, userId, todo, isCompleted } = todoObj;
  const [todoText, setTodoText] = useState(todo);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRemove = () => {
    axios({
      url: `${URL}/todos/${id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      const newList = todoList.filter((newTodo) => newTodo.id !== id);
      setTodoList(newList);
    });
  };

  const handleCheck = () => {
    axios({
      url: `${URL}/todos/${id}`,
      method: 'put',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: todo,
        isCompleted: !isCompleted,
      },
    }).then(() => {
      const copiedList = [...todoList];
      copiedList[todoList.indexOf(todoObj)] = {
        id: id,
        userId: userId,
        todo: todo,
        isCompleted: !isCompleted,
      };
      setTodoList(copiedList);
    });
  };
  return (
    <StyledTodoBox>
      <Wrapper>
        <CheckBox type="checkbox" checked={isCompleted} onChange={handleCheck} />
        <Text>{todo}</Text>
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
