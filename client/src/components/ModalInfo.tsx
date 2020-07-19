import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { lighten } from "polished";

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgba(80, 80, 80, 0.75);
`;

const Modal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.panel_background};
  padding: 10px 20px 25px 20px;
  max-width: 300px;
  @media screen and (min-width: 768px) {
    max-width: 480px;
  }
`;

const Heading = styled.h3`
  color: #d55;
  font-size: 1.4em;
  font-weight: bold;
`;

const Message = styled.p`
  color: ${theme.header_background};
`;

const Button = styled.button`
  font-size: 1em;
  background-color: ${theme.header_background};
  color: ${theme.header_text};
  padding: 5px 10px;
  text-shadow: 0 0 1px #000;
  border: 2px solid ${theme.header_text};
  box-shadow: 1px 1px 5px 0 ${lighten(0.25, theme.header_background)};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.2, theme.header_background)};
  }
`;

interface ModalInfoProps {
  message: string;
  onClose: () => void;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ message, onClose }) => {
  return (
    <ModalContainer>
      <Modal>
        <Heading>Error making request</Heading>
        <Message>{message}</Message>
        <Button onClick={onClose}>Close</Button>
      </Modal>
    </ModalContainer>
  );
};

export default ModalInfo;
