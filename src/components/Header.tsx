import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isLogIn, setIsLogIn }) => {
  const handleLogOut = useCallback(() => {
    localStorage.removeItem('token');
    setIsLogIn(false);
  }, [setIsLogIn]);

  return (
    <StyledHeader>
      <Logo>Todo List</Logo>
      <Nav>
        <Link to="/todo" className="expansion">
          To do
        </Link>
        {isLogIn ? (
          <p className="expansion" onClick={handleLogOut}>
            Log Out
          </p>
        ) : (
          <Link to="/signin" className="expansion">
            Sign In
          </Link>
        )}
      </Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 80px;
  background-color: black;
  color: white;
`;

const Logo = styled.h1`
  font-size: 26px;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 40vw;

  p {
    font-size: 18px;
  }

  a {
    color: white;
    font-size: 18px;
  }
`;

export default Header;
