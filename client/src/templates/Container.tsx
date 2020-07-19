import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  max-width: 1200px;
  padding: 0 10px;
  height: 100%;
  margin: 0 auto;
`;

const Cotaniner: React.FC = ({ children }) => {
  return <OuterContainer>{children}</OuterContainer>;
};

export default Cotaniner;
