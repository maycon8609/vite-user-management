import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useUserManagement } from "../hooks";
import { User } from "../types";


interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  loggedUser: User | null;
  signed: boolean;
  signIn: (email: string, password: string) => string | void;
  signOut: () => void;
  signUp: (name: string, email: string, password: string) => string | void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const { users, createUser } = useUserManagement();

  const prepareData = (loggedInUserEmail: string, data: User[]) => {
    const indexToLoggedUser = data.findIndex(
      (user) => user.email === loggedInUserEmail
    );

    let loggedUser: User | null = null;

    if (indexToLoggedUser > -1) {
      loggedUser = data[indexToLoggedUser];
    }

    return { loggedUser };
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const tokenUser = JSON.parse(userToken);
      const { loggedUser } = prepareData(tokenUser.email, users);
      if (loggedUser) setLoggedUser(loggedUser);
    }
  }, [users]);

  const signIn = (email: string, password: string): string | void => {
    if (!users.length) return "Usuário não cadastrado";

    const { loggedUser } = prepareData(email, users);

    if (loggedUser && loggedUser.password === password) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
      setLoggedUser(loggedUser);
    } else {
      return "E-mail ou senha incorretos";
    }
  };

  const signUp = (
    name: string,
    email: string,
    password: string
  ): string | void => {
    const hasUser = users.find((user) => user.email === email);
    if (hasUser) return "Já tem uma conta com esse E-mail";

    const newUser = { name, email, password };
    createUser(newUser);
  };

  const signOut = (): void => {
    setLoggedUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        signed: !!loggedUser,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
