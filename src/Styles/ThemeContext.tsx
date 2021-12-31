import React, { useState, createContext } from "react";

type ThemeType = {
  darkMode: boolean,
  setDarkMode: (prevState:boolean) => void
}
const defaultValue:ThemeType = {
  darkMode: false,
  setDarkMode: ()=>true
}

type ProviderType = {
  children: React.ReactNode
}
const ThemeContext = createContext<ThemeType>(defaultValue);
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }:ProviderType) => {
  const [darkMode, setDarkMode] = useState(true);
  return <Provider value={{ darkMode, setDarkMode }}>{children}</Provider>;
};

export { ThemeProvider, ThemeContext };
