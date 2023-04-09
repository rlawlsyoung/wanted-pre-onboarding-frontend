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

  useEffect(() => {
    if (!isLogIn) navigate('/signin');
  }, [isLogIn, navigate]);

  useEffect(() => {
    isLogIn &&
      axios
        .get(`${URL}/todos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          res.data && setTodoList(res.data);
        });
  }, []);

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleAddTodo = () => {
    setInputValue('');
    axios({
      url: `${URL}/todos`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        todo: inputValue,
      },
    }).then((res) => {
      setTodoList([...todoList, res.data]);
    });
  };

  return (
    <StyledTodo>
      <TodoContainer className="flex-center">
        <TodoTitle>To Do</TodoTitle>
        <InputContainer className="flex-center">
          <InputBox
            title="what to do?"
            dataTestId="new-todo-input"
            placeholder="Enter 1 to 28 characters"
            inputType="text"
            value={inputValue}
            maxLength={28}
            handleOnChange={handleOnChange}
          />
          <Btn data-testid="new-todo-add-button" onClick={handleAddTodo}>
            Add
          </Btn>
        </InputContainer>
        <TodoUl>
          {todoList.map((todo) => (
            <TodoBox text={todo.todo} key={todo.id} />
          ))}
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

const Btn = styled.button`
  width: 80px;
  height: 51px;
  border: none;
  margin: 0 0 40px 0;
  background-color: black;
  /* background-color: ${(props) => (props.disabled ? 'gray' : 'black')}; */
  color: white;
  font-family: 'Pretendard';
  font-size: 18px;
  cursor: pointer;
  /* cursor: ${(props) => (props.disabled ? '' : 'pointer')}; */
`;

const TodoUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Todo;
