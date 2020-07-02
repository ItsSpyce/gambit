import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const Input = styled.input`
  position: relative;
  background-color: ${theme.GRAY_5};
  outline: none;
  border: none;
  border-radius: 8px;
  color: ${theme.WHITE};
  padding: 8px;

  &:focus {
    border-bottom: ${(props) => props.underlineColor || theme.BLUE_1} 2px solid;
  }
`;

export default Input;
