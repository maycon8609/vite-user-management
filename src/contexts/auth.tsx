import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  signed: boolean;
  signIn: (email: string, password: string) => string | void;
  signUp: (name: string, email: string, password: string) => string | void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const users = JSON.parse(usersStorage);
      const tokenUser = JSON.parse(userToken);
      const loggedUser = users.find(
        (user: User) => user.email === tokenUser.email
      );

      if (loggedUser) {
        setUser(loggedUser);
      }
    }
  }, []);

  const signIn = (email: string, password: string): string | void => {
    const usersStorage = localStorage.getItem("users_bd");
    if (!usersStorage) return "Usuário não cadastrado";

    const storedUsers: User[] = JSON.parse(usersStorage);
    const loggedUser = storedUsers.find((user) => user.email === email);

    if (loggedUser && loggedUser.password === password) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
      setUser(loggedUser);
    } else {
      return "E-mail ou senha incorretos";
    }
  };

  const signUp = (
    name: string,
    email: string,
    password: string
  ): string | void => {
    const usersStorage = localStorage.getItem("users_bd");
    const storedUsers: User[] = usersStorage ? JSON.parse(usersStorage) : [];

    const hasUser = storedUsers.find((user) => user.email === email);
    if (hasUser) {
      return "Já tem uma conta com esse E-mail";
    }

    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users_bd", JSON.stringify(storedUsers));
  };

  const signOut = (): void => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
