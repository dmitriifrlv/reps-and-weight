import { theme } from "../Styles/Theme";
import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "../Styles/ThemeContext";
import { CgGym } from "react-icons/cg";

type CardProps = {
  darkMode: boolean;
};

type AuthFormContainerProps = {
  onSubmitHandler: (e: any) => void;
  children: React.ReactNode;
};

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

export const AuthFormContainer = ({
  onSubmitHandler,
  children,
}: AuthFormContainerProps) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <FormContainer onSubmit={onSubmitHandler} darkMode={darkMode}>
      <LogoContainer>
        <CgGym size="5rem" color="#b43919" />
        <LogoText>Reps & Weight</LogoText>
      </LogoContainer>
      {children}
    </FormContainer>
  );
};
