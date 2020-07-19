// globalStyles.js
import styled, { createGlobalStyle } from "styled-components";
import { theme } from "../theme";
import { lighten, darken } from "polished";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
      font-size: 1.6rem;
    }
    @media screen and (min-width: 1024px) {
      font-size: 1.7rem;
    }
    @media screen and (min-width: 1366px) {
      font-size: 1.8rem;
    }
  }
  a {
    cursor: pointer;
  }
`;

const HeadingMain = styled.h1`
  font-size: 2.6em;
  text-align: center;
  color: ${theme.panel_text};
`;

const Subheading = styled.p`
  font-size: 1em;
  color: ${theme.panel_text};
`;

const FormContainer = styled.div`
  background-color: ${theme.panel_background};
  box-shadow: 0 0 25px 0 ${lighten(0.5, theme.header_background)};
  padding: 10px 10px 25px 10px;
`;

const Form = styled.form`
  max-width: 480px;
  margin: 10px auto;
  padding: 10px 20px 30px 20px;
  border: 1px solid ${darken(0.2, theme.panel_background)};
  box-shadow: 0 0 25px 0 ${darken(0.3, theme.panel_background)};
`;

const Label = styled.label`
  display: block;
  color: ${theme.panel_text};
  font-size: 1.2em;
  margin-bottom: 1em;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px);
  margin: 10px 0;
  font-size: 1em;
  padding: 5px 10px;
  border: 1px solid ${darken(0.3, theme.panel_background)};
  box-shadow: 0 0 5px 0 ${darken(0.2, theme.panel_background)};
  color: #000000;
`;

const Submit = styled.input`
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

const InputError = styled.p`
  color: #ff3333;
  font-size: 0.75em;
`;

export {
  HeadingMain,
  Subheading,
  FormContainer,
  Form,
  Label,
  Input,
  Submit,
  InputError,
};

export default GlobalStyle;
