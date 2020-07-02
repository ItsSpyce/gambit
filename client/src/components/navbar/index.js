import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const StyledNavbar = styled.div`
  display: block;
  width: 100%;
  height: 60px;
  background-color: ${theme.GRAY_5};
`;

const UsernameInput = styled.input.attrs({ type: 'text' })`
  float: right;
  width: 220px;
  margin-right: 16px;
  margin-top: 12px;
  border: none;
  outline: none;
  background-color: transparent;
  height: 36px;
  font-size: 24px;
  color: white;
  text-align: center;
`;

const Navbar = (props) => {
  const [name, setName] = useState(props.user?.name);

  function submitName(event) {
    props.onUsernameChange(name);
    event.preventDefault();
    return false;
  }

  return (
    <StyledNavbar>
      <form onSubmit={submitName}>
        <UsernameInput
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Username..."
          maxLength="20"
        />
      </form>
    </StyledNavbar>
  );
};

export default Navbar;
