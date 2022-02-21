import { useContext, useEffect, useState } from "react";
import { NeoButton } from "../components";
import { theme } from "../Styles/Theme";
import styled from "@emotion/styled";
import { useLoginMutation, useSignupMutation } from "../app/service";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../app/AuthContext";
import { TextInput, PasswordInput } from "@mantine/core";
import { AuthFormContainer } from "../components/AuthFormContainer";
import { useNotifications } from "@mantine/notifications";
import { isFetchBaseQueryErrorWithStringError } from "../app/helpers";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputsContainer = styled.div`
  height: 59%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
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

const validationSchema = Yup.object({
  email: Yup.string().email("invalid email format").required("required"),
  password: Yup.string().min(3).required(),
});

type LoginFormType = Yup.InferType<typeof validationSchema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(validationSchema),
  });

  const notifications = useNotifications();
  const authContext = useContext(AuthContext);
  const location: any = useLocation();
  const navigate = useNavigate();
  const [login, loginResponse] = useLoginMutation();
  const [signup, signupResponse] = useSignupMutation();
  const [isLogin, setIsLogin] = useState(true);

  const from = location.state?.from?.pathname || "/";

  const onSubmitHandler = async (data: { email: string; password: string }) => {
    if (isLogin) {
      try {
        await login(data).unwrap();
      } catch (err) {
        if (isFetchBaseQueryErrorWithStringError(err)) {
          notifications.showNotification({
            title: "Error",
            message: err.data.message,
            color: "red",
          });
        } else {
          notifications.showNotification({
            title: "Error",
            message: "Something went wrong. Please try again later",
            color: "red",
          });
        }
      }
    } else {
      try {
        await signup(data).unwrap();
      } catch (err) {
        if (isFetchBaseQueryErrorWithStringError(err)) {
          notifications.showNotification({
            title: "Error",
            message: err.data.message,
            color: "red",
          });
        } else {
          notifications.showNotification({
            title: "Error",
            message: "Something went wrong. Please try again later",
            color: "red",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (loginResponse.isSuccess) {
      authContext.setAuthState(loginResponse.data);
      navigate(from, { replace: true });
    }
  }, [authContext, from, loginResponse, navigate]);

  useEffect(() => {
    if (signupResponse.isSuccess) {
      authContext.setAuthState(signupResponse.data);
      navigate(from, { replace: true });
    }
  }, [authContext, from, navigate, signupResponse]);

  useEffect(() => {
    if (signupResponse.isSuccess) {
      notifications.showNotification({
        title: "Success",
        message: "You have succesfully created your account!",
        color: "green",
        className: "notification",
        autoClose: 5000,
      });
    }
  }, [signupResponse.isSuccess, notifications]);

  return (
    <AuthFormContainer onSubmitHandler={handleSubmit(onSubmitHandler)}>
      <InputsContainer>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="jonhdoe@gmail.com"
              label="Email"
              classNames={{
                label: "text",
              }}
              size="md"
              error={errors.email?.message}
              required={errors.email?.type === "required"}
            />
          )}
        />

        <PasswordContainer>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="Password must be at least 3 characters long"
                label="Password"
                classNames={{
                  label: "text",
                }}
                size="md"
                error={errors.password?.message}
                required={errors.password?.type === "min"}
              />
            )}
          />
          <Link className="ForgotPasswordLink" to="/forgot-password">
            Forgot your password?
          </Link>
        </PasswordContainer>
        <NeoButton
          type="submit"
          fullWidth
          text={isLogin ? "Sign In" : "Create Account"}
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
