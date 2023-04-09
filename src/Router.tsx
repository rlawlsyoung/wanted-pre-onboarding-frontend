import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';
import Wrong from './pages/Wrong';

import GlobalStyles from './styles/GlobalStyles';

export const URL = 'https://www.pre-onboarding-selection-task.shop';

const Router = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) setIsLogIn(true);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn setIsLogIn={setIsLogIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<Todo isLogIn={isLogIn} />} />
          <Route path="/*" element={<Wrong />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
