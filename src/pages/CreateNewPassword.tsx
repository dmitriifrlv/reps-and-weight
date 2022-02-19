import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthFormContainer } from "../components/AuthFormContainer";
import styled from "@emotion/styled";
import { PasswordInput, Button } from "@mantine/core";
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

export const CreateNewPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(params);
  const resetPasswordHandler = () => console.log("reset");
  return (
    <AuthFormContainer onSubmitHandler={resetPasswordHandler}>
      <ContentContainer>
        <InputsContainer>
          <Title>Create new password</Title>
          <PasswordInput
            placeholder="Password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            classNames={{
              label: "text",
              input: "text-l",
            }}
            size="md"
          />
          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
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
          Save New Password
        </Button>
      </ContentContainer>
    </AuthFormContainer>
  );
};
