import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import InputBox from '../components/InputBox';
import TodoBox from '../components/TodoBox';

import { URL } from '../Router';
import { useNavigate } from 'react-router-dom';

interface TodoTypes {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface TodoProps {
  isLogIn: boolean;
}

const Todo: React.FC<TodoProps> = ({ isLogIn }) => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<TodoTypes[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!isLogIn) navigate('/signin');
  }, [isLogIn, navigate]);

  useEffect(() => {
    if (inputValue.length > 0 && inputValue.length <= 32) setIsValid(true);
    else setIsValid(false);
  }, [inputValue]);

  useEffect(() => {
    isLogIn &&
      axios({
        url: `${URL}/todos`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        res.data && setTodoList(res.data);
      });
  }, [isLogIn]);

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleAddTodo = useCallback(() => {
    setInputValue('');
    axios({
      url: `${URL}/todos`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: inputValue,
      },
    }).then((res) => {
      setTodoList([...todoList, res.data]);
    });
  }, [inputValue, todoList]);

  return (
    <StyledTodo>
      <TodoContainer className="flex-center">
        <TodoTitle>To Do</TodoTitle>
        <InputContainer className="flex-center">
          <InputBox
            title="what to do?"
            dataTestId="new-todo-input"
            placeholder="Enter 1 to 32 characters"
            inputType="text"
            value={inputValue}
            maxLength={32}
            handleOnChange={handleOnChange}
          />
          <Btn data-testid="new-todo-add-button" onClick={handleAddTodo} disabled={!isValid}>
            Add
          </Btn>
        </InputContainer>
        <TodoUl>
          {todoList.map((todo) => {
            const handleRemove = () => {
              axios({
                url: `${URL}/todos/${todo.id}`,
                method: 'delete',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }).then(() => {
                const newList = todoList.filter((newTodo) => newTodo.id !== todo.id);
                setTodoList(newList);
              });
            };

            const handleCheck = () => {
              axios({
                url: `${URL}/todos/${todo.id}`,
                method: 'put',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
                data: {
                  todo: todo.todo,
                  isCompleted: !todo.isCompleted,
                },
              }).then(() => {
                const copiedList = [...todoList];
                copiedList[todoList.indexOf(todo)] = {
                  id: todo.id,
                  userId: todo.userId,
                  todo: todo.todo,
                  isCompleted: !todo.isCompleted,
                };
                setTodoList(copiedList);
              });
            };
            return (
              <TodoBox
                id={todo.id}
                text={todo.todo}
                isCompleted={todo.isCompleted}
                key={todo.id}
                handleCheck={handleCheck}
                handleRemove={handleRemove}
              />
            );
          })}
        </TodoUl>
      </TodoContainer>
    </StyledTodo>
  );
};

const StyledTodo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  margin-top: 120px;
`;

const TodoContainer = styled.div`
  flex-direction: column;
  width: 360px;
`;

const TodoTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 900;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Btn = styled.button<{ disabled: boolean }>`
  width: 80px;
  height: 51px;
  border: none;
  margin: 0 0 40px 0;
  background-color: ${(props) => (props.disabled ? 'gray' : 'black')};
  color: white;
  font-family: 'Pretendard';
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
`;

const TodoUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Todo;
