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
import {
  register as registerAction,
  errorDismiss as errorDismissAction,
} from "../actions";
import { connect } from "react-redux";

interface RegisterProps {
  history: any;
  scheduled: Task[];
  done: Task[];
  registerUser: (
    email: string,
    password: string,
    passwordRepeat: string,
    scheduled: Task[],
    done: Task[],
    onSuccess: () => void
  ) => void;
}

const Register: React.FC<RegisterProps> = ({
  history,
  scheduled,
  done,
  registerUser,
}) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: any) => {
    registerUser(
      data.email,
      data.password,
      data["password-repeat"],
      scheduled,
      done,
      () => history.push("/")
    );
  };

  return (
    <Container>
      <FormContainer>
        <HeadingMain>REGISTER</HeadingMain>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Subheading>
            Enter your email and password to register, if you are already
            registered, please login: <a href="/login">login</a>
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
            {errors.email && <InputError>Email must be correct</InputError>}
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
          </Label>
          <Label htmlFor="password-repeat">
            Repeat password
            <Input
              name="password-repeat"
              type="password"
              id="password-repeat"
              ref={register({
                required: true,
                validate: (v: any) => v === watch("password") && v.length >= 6,
              })}
            />
            {errors.password && (
              <InputError>
                Password must contain at least 6 characters
              </InputError>
            )}
            {errors["password-repeat"] && (
              <InputError>
                You must repeat the password in both fields!
              </InputError>
            )}
          </Label>
          <Submit type="submit" value="Register" />
        </Form>
      </FormContainer>
    </Container>
  );
};

const mapStateToProps = (state: { scheduled: Task[]; done: Task[] }) => {
  const { scheduled, done } = state;
  return {
    scheduled,
    done,
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  registerUser: (
    email: string,
    password: string,
    passwordRepeat: string,
    scheduled: Task[],
    done: Task[],
    onSuccess: () => void
  ) =>
    dispatch(
      registerAction(
        email,
        password,
        passwordRepeat,
        scheduled,
        done,
        onSuccess
      )
    ),
  errorDismiss: () => dispatch(errorDismissAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
