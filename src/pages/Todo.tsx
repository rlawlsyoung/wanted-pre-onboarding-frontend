import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import InputBox from '../components/InputBox';

import { URL } from '../Router';

interface TodoTypes {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const Todo = () => {
  const [todoList, setTodoList] = useState<TodoTypes[]>([]);

  useEffect(() => {
    axios
      .get(`${URL}/todos`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);
  return (
    <StyledTodo className="flex-center">
      <TodoContainer className="flex-center">
        <TodoTitle>To Do</TodoTitle>
        <InputContainer className="flex-center">
          <InputBox
            title="what to do?"
            dataTestId="email-input"
            placeholder="at lease 1 character"
            inputType="text"
            handleOnChange={() => {}}
          />
          <Btn>Add</Btn>
        </InputContainer>
      </TodoContainer>
    </StyledTodo>
  );
};

const StyledTodo = styled.div`
  height: calc(100vh - 80px);
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

export default Todo;
