import { useState, createContext } from "react";

type AuthStateType = {
  token: string | null;
  expiresAt: string | null;
  user: {};
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: (authInfo: AuthStateType) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};
const defaultValue: AuthContextType = {
  authState: {
    token: null,
    expiresAt: null,
    user: {},
  },
  setAuthState: (authInfo: AuthStateType) => true,
  isAuthenticated: () => false,
  logout: () => true,
};

const AuthContext = createContext(defaultValue);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const expiresAt = localStorage.getItem("expiresAt");

  const initialAuthState: AuthStateType = {
    token,
    expiresAt,
    user: user ? JSON.parse(user) : {},
  };

  const [authState, setAuthState] = useState(initialAuthState);

  const setAuthInfo = ({ token, user, expiresAt }: AuthStateType) => {
    if (token && expiresAt && user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt!);
    }
    setAuthState({
      token,
      user,
      expiresAt,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setAuthState({
      token: null,
      expiresAt: null,
      user: {},
    });
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < parseInt(authState.expiresAt);
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
