import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import theme from '../../theme';

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  outline: none;
  padding: ${(props) => (props.isSecondary ? '6px 10px' : '4px 8px')};
  border-radius: 8px;
  text-align: center;
  min-width: 140px;
  height: 36px;
  cursor: pointer;
  transition: all ease-out 150ms;

  &:focus {
    outline: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 8px 2px ${theme.GRAY_5};
  }

  & svg {
    transform: translateY(-1px);
  }
`;

function getColorFor(type) {
  if (!type) return theme.BLUE_1;
  switch (type.toLowerCase()) {
    case 'success':
      return theme.GREEN_2;
    case 'warning':
      return theme.YELLOW_1;
    case 'error':
      return theme.RED_1;
  }
}

const Button = ({
  variant,
  secondary,
  onClick,
  onTouchStart,
  children,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(event) {
    setIsLoading(true);
    if (typeof onClick === 'function') {
      const result = onClick(event);
      if (result?.then) {
        // handling a promise
        Promise.all([result]).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        return result;
      }
    } else if (onClick?.then) {
      // handling a promise
      onClick.then((result) => {
        setIsLoading(false);
        return result;
      });
    }
  }

  function handleTouch(event) {
    setIsLoading(true);
    if (typeof onTouchStart === 'function') {
      const result = onTouchStart(event);
      if (result?.then) {
        // handling a promise
        Promise.all([result]).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        return result;
      }
    } else if (onTouchStart?.then) {
      // handling a promise
      onTouchStart.then((result) => {
        setIsLoading(false);
        return result;
      });
    }
  }

  return (
    <StyledButton
      {...rest}
      border={secondary ? 'none' : `${getColorFor(variant)} 2px solid`}
      backgroundColor={secondary ? theme.GRAY_5 : getColorFor(variant)}
      color={!secondary ? theme.WHITE : getColorFor(variant)}
      isSecondary={secondary}
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      {!isLoading && children}
      {isLoading && (
        <Spinner
          animation="border"
          role="status"
          variant="light"
          as="span"
          size="sm"
          aria-hidden="true"
        />
      )}
    </StyledButton>
  );
};

export default Button;
