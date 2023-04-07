import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <StyledHeader>
      <Logo>Todo List</Logo>
      <Nav>
        <Link to="/signin" className="expansion">
          Sign In
        </Link>
        <Link to="/todo" className="expansion">
          To do
        </Link>
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

  a {
    color: white;
    font-size: 18px;
  }
`;

export default Header;
