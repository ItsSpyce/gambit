import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../button';
import theme from '../../theme';

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.GRAY_5};
  opacity: 0.9;
`;

const ModalWindow = styled.div`
  position: absolute;
  transform: translate(50%);
  top: 20%;
  left: 22%;
  background-color: ${theme.GRAY_4};
  border-radius: 12px;
  width: 360px;
  box-shadow: 0 8px 10px ${theme.GRAY_5};
  padding: 24px;
`;

const ModalTitle = styled.div`
  align-content: center;
  text-align: center;
  font-size: 28px;
  font-weight: 100;
  display: block;
  margin-bottom: 42px;
`;

const ModalContent = styled.div`
  margin: 16px 0;
  min-height: 80px;
  position: relative;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled(Button)`
  font-size: 18px;
  height: 42px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 8px 2px ${theme.GRAY_5};
  }

  & svg {
    vertical-align: middle;
  }
`;

const noop = () => {};

/**
 *
 * @param {{isShowing: boolean, children, title: string, onSubmit: Function|Promise, onCancel: Function|Promise, submitText: string, cancelText: string}} props
 */
const Modal = ({
  isShowing,
  children,
  title,
  onSubmit,
  onCancel,
  submitText = 'Okay',
  cancelText = 'Cancel',
  submitVariant,
  cancelVariant,
  ...rest
}) => (
  <>
    {isShowing && (
      <>
        <ModalBackground />
        <ModalWindow {...rest}>
          <ModalTitle>{title}</ModalTitle>
          <ModalContent>{children}</ModalContent>
          <ModalButtons>
            {onCancel && (
              <ModalButton onClick={onCancel} variant={cancelVariant} secondary>
                {cancelText}
              </ModalButton>
            )}
            <ModalButton onClick={onSubmit} variant={submitVariant}>
              {submitText}
            </ModalButton>
          </ModalButtons>
        </ModalWindow>
      </>
    )}
  </>
);

export default Modal;
