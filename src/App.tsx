import { Routes, Route } from "react-router-dom";
import { Login, Home, Workout, Profile } from "./pages";
import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "./Styles/ThemeContext";
import AuthRoute from "./app/AuthRoute";
import { CreateNewPassword } from "./pages/CreateNewPassword";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Landing } from "./pages/Landing";

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
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-new-password/:token"
          element={<CreateNewPassword />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="home"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route path="workout">
          <Route
            index
            element={
              <AuthRoute>
                <Workout />
              </AuthRoute>
            }
          />
          <Route
            path=":workoutId"
            element={
              <AuthRoute>
                <Workout />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
