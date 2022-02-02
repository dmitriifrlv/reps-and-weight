import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "../Styles/ThemeContext";

type StyledIconButtonProps = {
  darkMode: boolean;
  size: "small" | "regular" | "big";
};

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: inline-flex;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  min-height: 48px;
  color: ${({ darkMode, theme }) =>
    darkMode ? theme.colors.light : theme.colors.dark};
  background: ${({ darkMode, theme, color }) => {
    if (color === "red") {
      return theme.colors.red;
    }
    return darkMode ? theme.colors.dark : theme.colors.light;
  }};
  box-shadow: ${({ darkMode, theme }) =>
    darkMode ? theme.shadows.dark.bsDark : theme.shadows.light.bsLight};
  min-width: ${({ size }) =>
    size === "small" ? "2rem" : size === "big" ? "3.75rem" : "3rem"};
  height: ${({ size }) =>
    size === "small" ? "2rem" : size === "big" ? "3.75rem" : "3rem"};
  &:hover {
    box-shadow: ${({ darkMode, theme, color }) => {
      if (color === "red") {
        return "none";
      }
      return darkMode
        ? theme.shadows.dark.bsDarkHover
        : theme.shadows.light.bsLightHover;
    }};
    background: ${({ color, theme }) => (color === "red" ? "#e0451f" : "none")};
  }
  &:active {
    box-shadow: ${({ darkMode, theme, color }) => {
      if (color === "red") {
        return "none";
      }
      return darkMode
        ? theme.shadows.dark.bsDarkActive
        : theme.shadows.light.bsLightActive;
    }};
  }
`;

type IconButtonProps = {
  size?: "regular" | "small" | "big";
  onClick?: () => void;
  icon: React.ReactNode;
  color?: "red";
};

const IconButton = ({
  size = "regular",
  color,
  icon,
  ...rest
}: IconButtonProps) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <StyledIconButton color={color} size={size} darkMode={darkMode} {...rest}>
      {icon}
    </StyledIconButton>
  );
};

export { IconButton };
