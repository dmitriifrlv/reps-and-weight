import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "../Styles/ThemeContext";
import ClipLoader from "react-spinners/ClipLoader";

type StyledButtonProps = {
  darkMode: boolean;
  size: "small" | "regular" | "large";
  fullWidth?: boolean;
};

const StyledTextContainer = styled.span`
  label: styledButton-text;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button<StyledButtonProps>`
  label: styledButton;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "")};
  height: ${({ size }) => (size === "large" ? "60px" : "")};
  font-weight: 500;
  border:none;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  background: ${({ darkMode, theme, color }) =>
    color === "red"
      ? theme.colors.red
      : darkMode
      ? theme.colors.dark
      : theme.colors.light};
  color: ${({ darkMode, theme }) =>
    darkMode ? theme.colors.light : theme.colors.dark};
  box-shadow: ${({ darkMode, theme, color }) =>
    color === "red"
      ? theme.shadows.red.redBs
      : darkMode
      ? theme.shadows.dark.bsDark
      : theme.shadows.light.bsLight};
  padding: 9px 18px;
  &:hover {
    box-shadow: ${({ darkMode, theme, color }) =>
      color === "red"
        ? theme.shadows.red.redBsHover
        : darkMode
        ? theme.shadows.dark.bsDarkHover
        : theme.shadows.light.bsLightHover};
  };
  &:active {
    box-shadow: ${({ darkMode, theme, color }) =>
      color === "red"
        ? theme.shadows.red.redBsActive
        : darkMode
        ? theme.shadows.dark.bsDarkActive
        : theme.shadows.light.bsLightActive};
`;

type IconButtonProps = {
  size?: "regular" | "small" | "large";
  icon?: React.ReactNode;
  text: string;
  color?: "red";
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
  isLoading?: boolean;
};

export const NeoButton = ({
  type,
  size = "regular",
  icon,
  text,
  color,
  fullWidth,
  onClick,
  isLoading,
  ...rest
}: IconButtonProps) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <StyledButton
      type={type}
      size={size}
      darkMode={darkMode}
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
      {...rest}
    >
      {icon ? icon : null}
      <ClipLoader color="red" loading={Boolean(isLoading)} size={30} />
      {text ? <StyledTextContainer>{text}</StyledTextContainer> : ""}
    </StyledButton>
  );
};
