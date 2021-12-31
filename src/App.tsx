import { Routes, Route } from "react-router-dom";
import { Login } from "./pages";
import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "./Styles/ThemeContext";

const AppContainer = styled.div<{ darkMode: boolean }>`
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.light : theme.colors.dark};
  background: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.dark : theme.colors.light};
  min-height: -webkit-fill-available;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  label: appContainer;
`;

function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <AppContainer darkMode={darkMode}>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
