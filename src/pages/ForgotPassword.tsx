import { useState } from "react";
import { AuthFormContainer } from "../components/AuthFormContainer";
import styled from "@emotion/styled";
import { TextInput, Button } from "@mantine/core";
import { theme as rnwTheme } from "../Styles/Theme";

const ContentContainer = styled.div`
  height: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Instruction = styled.p`
  font-size: 1.125rem;
`;

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const resetPasswordHandler = () => console.log("reset");
  return (
    <AuthFormContainer onSubmitHandler={resetPasswordHandler}>
      <ContentContainer>
        <InputsContainer>
          <Title>Reset your password</Title>
          <Instruction>
            Enter the email you use for your <strong>Reps & Weight</strong>{" "}
            account and we will send an email with instructions to reset your
            password.
          </Instruction>
          <TextInput
            placeholder="example@gmail.com"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            classNames={{
              label: "text",
              input: "text-l",
            }}
            size="md"
          />
        </InputsContainer>
        <Button
          styles={(theme) => ({
            root: {
              backgroundColor: rnwTheme.colors.red,
              height: 52,
              borderRadius: 8,
              fontSize: "1.25rem",
              boxShadow: rnwTheme.shadows.dark.bsDark,
              "&:hover": {
                backgroundColor: theme.fn.darken(rnwTheme.colors.red, 0.05),
              },
            },

            leftIcon: {
              marginRight: 15,
            },
          })}
        >
          Send Instructions
        </Button>
      </ContentContainer>
    </AuthFormContainer>
  );
};