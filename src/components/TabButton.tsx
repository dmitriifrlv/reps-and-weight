import styled from "@emotion/styled";
import React from "react";

type TabButtonProps = {
  text: string;
  icon: JSX.Element;
  onClick: (arg?: any) => void;
  fullWidth?: boolean;
};
const NeoTabButton = styled.button<{ darkMode: boolean; fullWidth?: boolean }>`
  cursor: pointer;
  border: none;
  height: 100%;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "50%")};
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  gap: 0.5rem;
  box-shadow: ${({ darkMode, theme }) =>
    darkMode ? theme.shadows.dark.bsDark : theme.shadows.light.bsLight};
  &:hover {
    box-shadow: ${({ darkMode, theme }) =>
      darkMode
        ? theme.shadows.dark.bsDarkHoverTab
        : theme.shadows.light.bsLightHover};
  }
  &:active {
    box-shadow: ${({ darkMode, theme }) =>
      darkMode
        ? theme.shadows.dark.bsDarkActive
        : theme.shadows.light.bsLightActive};
  }
  clip-path: inset(-10px 0px 0px 0px);
  @media (max-width: 600px) {
    flex-direction: column;
    font-size: 1rem;
    gap: 4px;
  }
`;

export const TabButton = ({
  icon,
  text,
  onClick,
  fullWidth,
}: TabButtonProps) => {
  return (
    <NeoTabButton fullWidth={fullWidth} darkMode={true} onClick={onClick}>
      {icon}
      {text}
    </NeoTabButton>
  );
};
