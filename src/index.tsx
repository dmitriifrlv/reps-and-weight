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
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <MantineProvider
          theme={{ colorScheme: "dark", fontFamily: "Baloo Thambi 2" }}
        >
          <NotificationsProvider position="top-left">
            <AuthProvider>
              <BrowserRouter>
                <Provider store={store}>
                  <App />
                </Provider>
              </BrowserRouter>
            </AuthProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
