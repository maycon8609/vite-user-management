import { createContext, ReactElement, useEffect, useState } from "react";

import { useUserManagement } from "@/hooks";
import type { User } from "@/global/types";
import type { AuthContextProps, AuthProviderProps } from "./types";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const { users, createUser } = useUserManagement();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const token = JSON.parse(userToken);

      const loggedUser = users.find((user) => user.id === token.id);

      if (loggedUser) setLoggedUser(loggedUser);
    }
  }, [users]);

  const signIn = (email: string, password: string): string | void => {
    if (!users.length) return "Usuário não cadastrado";

    const loggedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (loggedUser) {
      localStorage.setItem("user_token", JSON.stringify({ loggedUser }));
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
    if (hasUser) return "Já existe um usuario cadastrado com este e-mail";

    createUser({ name, email, password, type: "USER" });
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
