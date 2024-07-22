import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { User } from "../types";

interface UserManagementProviderProps {
  children: ReactNode;
}

export interface UserManagementContextProps {
  users: User[];
  createUser: (user: Omit<User, "id">) => void;
  updateUser: (user: Partial<Omit<User, "id">> & Pick<User, "id">) => void;
  deleteUser: (id: string) => void;
}

export const UserManagementContext = createContext(
  {} as UserManagementContextProps
);

export const UserManagementProvider = ({
  children,
}: UserManagementProviderProps): ReactElement => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUserData = () => {
    const usersStorage = localStorage.getItem("users_bd");

    if (usersStorage) {
      const storedUsers: User[] = JSON.parse(usersStorage);
      setUsers(storedUsers);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const createUser = (user: Omit<User, "id">) => {
    const data: User[] = [
      ...users,
      {
        id: Math.random().toString(36).substring(2),
        ...user,
      },
    ];
    localStorage.setItem("users_bd", JSON.stringify(data));
    loadUserData();
  };

  const updateUser = (user: Partial<Omit<User, "id">> & Pick<User, "id">) => {
    const data = users;
    const indexToTargetUser = data.findIndex((item) => item.id === user.id);

    if (indexToTargetUser > -1) {
      data[indexToTargetUser] = {
        ...data[indexToTargetUser],
        ...user,
      };

      localStorage.setItem("users_bd", JSON.stringify(data));
      loadUserData();
    }
  };

  const deleteUser = (id: string) => {
    let data = users;
    const indexToTargetUser = data.findIndex((item) => item.id === id);

    if (indexToTargetUser > -1) {
      data = indexToTargetUser === 0 ? [] : data.splice(indexToTargetUser, 1);

      localStorage.setItem("users_bd", JSON.stringify(data));
      loadUserData();
    }
  };

  return (
    <UserManagementContext.Provider
      value={{
        users,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};
