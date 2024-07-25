import { createContext, ReactElement, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { mockUsersDB } from "./util";
import type { User } from "@/global/types";
import type {
  UserManagementContextProps,
  UserManagementProviderProps,
} from "./types";

export const UserManagementContext = createContext(
  {} as UserManagementContextProps
);

export const UserManagementProvider = ({
  children,
}: UserManagementProviderProps): ReactElement => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersStorage = localStorage.getItem("users_bd");

    if (usersStorage) {
      const storedUsers: User[] = JSON.parse(usersStorage);
      setUsers(storedUsers);
    } else {
      mockUsersDB();
    }
  }, []);

  const createUser = (
    user: Omit<User, "id">
  ): { errorMessage: string } | void => {
    const userAlreadyExists = users.find((item) => item.email === user.email);

    if (userAlreadyExists)
      return {
        errorMessage: "Já existe um usuario cadastrado com este e-mail",
      };

    const data: User[] = [
      ...users,
      {
        id: uuidV4(),
        ...user,
      },
    ];
    localStorage.setItem("users_bd", JSON.stringify(data));
    setUsers(data);
  };

  const updateUser = (
    user: Partial<Omit<User, "id">> & Pick<User, "id">
  ): void => {
    const data = users.map((item) => {
      if (item.id === user.id) {
        return {
          ...item,
          ...user,
        };
      }

      return item;
    });

    localStorage.setItem("users_bd", JSON.stringify(data));
    setUsers(data);
  };

  const deleteUser = (id: string) => {
    const data = users.filter((user) => user.id !== id);
    localStorage.setItem("users_bd", JSON.stringify(data));
    setUsers(data);
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
