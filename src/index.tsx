import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider as ColorModeProvider } from "./Styles/ThemeContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Styles/Theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./app/AuthContext";
import { store } from "./app/store";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const muiTheme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <AuthProvider>
            <BrowserRouter>
              <Provider store={store}>
                <App />
              </Provider>
            </BrowserRouter>
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
