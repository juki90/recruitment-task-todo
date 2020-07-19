import React from "react";
import Container from "../templates/Container";
import {
  HeadingMain,
  Subheading,
  FormContainer,
  Form,
  Label,
  Input,
  Submit,
  InputError,
} from "../style";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { login as loginAction } from "../actions";
import { connect } from "react-redux";

interface LoginProps {
  history: any;
  login: (email: string, password: string, onSuccess: () => void) => void;
}

const Login: React.FC<LoginProps> = ({ history, login }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit: (data: any) => void = (data) => {
    const { email, password } = data;
    login(email, password, () => history.push("/"));
  };

  return (
    <Container>
      <FormContainer>
        <HeadingMain>LOGIN</HeadingMain>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Subheading>
            Enter your email and password to login, if you are not yet
            registered, please register: <a href="/register">register</a>
          </Subheading>
          <Label htmlFor="email">
            User email
            <Input
              name="email"
              type="text"
              id="email"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && (
              <InputError data-testid="emailaddress-error">
                Email must be correct
              </InputError>
            )}
          </Label>
          <Label htmlFor="password">
            User password
            <Input
              name="password"
              type="password"
              id="password"
              ref={register({
                required: true,
                validate: (v) => v.length >= 6,
              })}
            />
            {errors.password && (
              <InputError data-testid="password-error">
                Password must contain at least 6 characters
              </InputError>
            )}
          </Label>
          <Submit id="submit" type="submit" value="Login" />
        </Form>
      </FormContainer>
    </Container>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: { email: string; password: string; onSuccess: () => void };
  }) => any
) => ({
  login: (email: string, password: string, onSuccess: () => void) =>
    dispatch(loginAction(email, password, onSuccess)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
