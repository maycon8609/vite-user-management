import { ReactNode } from "react";

import type { User } from "@/global/types";

export type AuthProviderProps = {
  children: ReactNode;
}

export type AuthContextProps = {
  loggedUser: User | null;
  signed: boolean;
  signIn: (email: string, password: string) => string | void;
  signOut: () => void;
  signUp: (name: string, email: string, password: string) => string | void;
}

export type UserManagementProviderProps = {
  children: ReactNode;
}

export type UserManagementContextProps = {
  users: User[];
  createUser: (user: Omit<User, "id">) => { errorMessage: string } | void;
  updateUser: (user: Partial<Omit<User, "id">> & Pick<User, "id">) => void;
  deleteUser: (id: string) => void;
}