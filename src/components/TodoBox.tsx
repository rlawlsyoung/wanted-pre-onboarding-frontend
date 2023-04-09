import { useState, useRef, useEffect, useCallback } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, userId, todo, isCompleted } = todoObj;
  const [todoText, setTodoText] = useState(todo);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditMode]);

  useEffect(() => {
    if (todoText.length) setIsValid(false);
    else setIsValid(true);
  }, [todoText]);

  const handleEditMode = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode]);

  const handleTodoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  }, []);

  const handleRemove = useCallback(() => {
    axios({
      url: `${URL}/todos/${id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        const newList = todoList.filter((newTodo) => newTodo.id !== id);
        setTodoList(newList);
      })
      .catch(() => {
        alert('error');
      });
  }, [id, todoList, setTodoList]);

  const handleCheck = useCallback(() => {
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
    })
      .then(() => {
        const copiedList = [...todoList];
        copiedList[todoList.indexOf(todoObj)] = {
          id: id,
          userId: userId,
          todo: todo,
          isCompleted: !isCompleted,
        };
        setTodoList(copiedList);
      })
      .catch(() => {
        alert('error');
      });
  }, [id, isCompleted, todo, userId, todoObj, setTodoList, todoList]);

  const handleEditSubmit = useCallback(() => {
    axios({
      url: `${URL}/todos/${id}`,
      method: 'put',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: todoText,
        isCompleted: isCompleted,
      },
    })
      .then(() => {
        const copiedList = [...todoList];
        copiedList[todoList.indexOf(todoObj)] = {
          id: id,
          userId: userId,
          todo: todoText,
          isCompleted: isCompleted,
        };
        setTodoList(copiedList);
        setIsEditMode(false);
      })
      .catch(() => {
        alert('error');
      });
  }, [id, isCompleted, userId, todoObj, setTodoList, todoList, todoText]);

  return (
    <StyledTodoBox>
      <Wrapper>
        <CheckBox type="checkbox" checked={isCompleted} onChange={handleCheck} />
        {isEditMode ? (
          <EditInput
            value={todoText}
            data-testid="modify-input"
            ref={inputRef}
            onChange={handleTodoChange}
            maxLength={32}
            placeholder="Enter 1 to 32 characters"
          />
        ) : (
          <Text>{todo}</Text>
        )}
      </Wrapper>
      <Wrapper>
        {isEditMode ? (
          <>
            <SubmitBtn data-testid="submit-button" onClick={handleEditSubmit} disabled={isValid}>
              Submit
            </SubmitBtn>
            <Btn data-testid="cancel-button" onClick={handleEditMode}>
              Cancel
            </Btn>
          </>
        ) : (
          <>
            <Btn data-testid="modify-button" onClick={handleEditMode}>
              Edit
            </Btn>
            <Btn data-testid="delete-button" onClick={handleRemove}>
              Remove
            </Btn>
          </>
        )}
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

const EditInput = styled.input`
  height: 30px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-family: 'Pretendard';
  font-size: 15.5px;
`;

const Text = styled.p`
  width: calc(360px - 133px);
  font-size: 15.5px;
  word-break: break-all;
  overflow: hidden;
`;
const SubmitBtn = styled.button<{ disabled: boolean }>`
  width: 55px;
  height: 40px;
  border: none;
  background-color: ${(props) => (props.disabled ? 'gray' : 'black')};
  border-left: 2.5px solid white;
  color: white;
  font-family: 'Pretendard';
  font-size: 11px;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
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
