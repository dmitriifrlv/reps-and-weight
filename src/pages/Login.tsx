import React, { useContext, useEffect, useState } from "react";
// import { StyledInput, StyledButton } from "../components/";
import { NeoButton } from "../components";
import { theme } from "../Styles/Theme";
import styled from "@emotion/styled";
import { CgGym } from "react-icons/cg";
import { ThemeContext } from "../Styles/ThemeContext";
// import { CardProps } from "../Types/StyledElementsTypes";
import { useLoginMutation, useSignupMutation } from "../app/service";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../app/AuthContext";
import { TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

type CardProps = {
  darkMode: boolean;
};

const LogoContainer = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

const LogoText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const FormContainer = styled.form<CardProps>`
  label: authForm;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: space-between;
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  box-shadow: ${({ darkMode }) =>
    darkMode ? theme.shadows.dark.bsDark : theme.shadows.light.bsLight};
  transition: box-shadow 0.2s ease;
  @media (min-width: 600px) {
    height: 75%;
    width: 75%;
    max-width: 600px;
  }
  @media (min-width: 992px) {
    height: 75%;
    width: 50%;
    max-width: 600px;
  }
`;

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
  const { darkMode } = useContext(ThemeContext);
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
    <>
      <FormContainer onSubmit={onSubmitHandler} darkMode={darkMode}>
        <LogoContainer>
          <CgGym size="5rem" color="#b43919" />
          <LogoText>Reps & Weight</LogoText>
        </LogoContainer>
        <InputsContainer>
          <TextInput
            placeholder="jonhdoe@gmail.com"
            label="Email"
            onChange={(event) => setEmail(event.currentTarget.value)}
            classNames={{
              label: "textLabel",
              input: "inputText",
            }}
            size="md"
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            classNames={{
              label: "textLabel",
              input: "inputText",
            }}
            size="md"
            sx={{
              "&::placeholder": { fontFamily: "Baloo Thambi 2", color: "red" },
            }}
          />
          {/* <NeoInput
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          /> */}
          {/* <NeoInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          /> */}
          <NeoButton
            type="submit"
            fullWidth
            text={isLogin ? "Sign In" : "Sign Up"}
            onClick={onSubmitHandler}
            size="large"
            isLoading={loginResponse.isLoading}
          />
          {/* {loginResponse.isError && "wrong login or pasword"}  */}
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
      </FormContainer>
    </>
  );
};

export { Login };
