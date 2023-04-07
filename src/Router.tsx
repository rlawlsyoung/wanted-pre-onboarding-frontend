import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import GlobalStyles from './styles/GlobalStyles';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
