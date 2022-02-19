import React, { useContext, useEffect, useState } from "react";
import { NeoButton } from "../components";
import { theme } from "../Styles/Theme";
import styled from "@emotion/styled";
import { useLoginMutation, useSignupMutation } from "../app/service";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../app/AuthContext";
import { TextInput, PasswordInput } from "@mantine/core";
import { AuthFormContainer } from "../components/AuthFormContainer";

const InputsContainer = styled.div`
  height: 59%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AuthFooter = styled.footer`
  min-height: 92px;
  height: 16%;
  width: 100%;
  background-color: ${theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 1.25rem 1.25rem 0 0;
  padding: 0 2rem;
  @media (min-width: 600px) {
    border-radius: 1rem;
  }
`;

const Login = () => {
  const authContext = useContext(AuthContext);
  const location: any = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResponse] = useLoginMutation();
  const [signup, signupResponse] = useSignupMutation();
  const [isLogin, setIsLogin] = useState(true);
  const [, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      return;
    } else {
      const user = {
        email,
        password,
      };
      isLogin ? login(user) : signup(user);
    }
  };

  useEffect(() => {
    if (loginResponse.isSuccess || signupResponse.isSuccess) {
      authContext.setAuthState(loginResponse.data);
      navigate(from, { replace: true });
    }
  }, [authContext, from, loginResponse, navigate, signupResponse.isSuccess]);

  return (
    <AuthFormContainer onSubmitHandler={onSubmitHandler}>
      <InputsContainer>
        <TextInput
          placeholder="jonhdoe@gmail.com"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          classNames={{
            label: "text",
            input: "text-l",
          }}
          size="md"
        />
        <PasswordInput
          value={password}
          placeholder="Password"
          label="Password"
          onChange={(event) => setPassword(event.currentTarget.value)}
          classNames={{
            label: "text",
            input: "text-l",
          }}
          size="md"
        />
        <NeoButton
          type="submit"
          fullWidth
          text={isLogin ? "Sign In" : "Sign Up"}
          onClick={onSubmitHandler}
          size="large"
          isLoading={loginResponse.isLoading}
        />
      </InputsContainer>

      <AuthFooter>
        <NeoButton
          size="large"
          fullWidth
          color="red"
          text={isLogin ? "Create Account" : "Have an account? Sign In!"}
          onClick={() => setIsLogin(!isLogin)}
        />
      </AuthFooter>
    </AuthFormContainer>
  );
};

export { Login };
