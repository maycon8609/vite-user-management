import { User } from "@/types";

export type AddUserProps = {
  'data-testid'?: string
  createUser: (user: Omit<User, "id">) => void
  errorMessage: string | null
  isOpen: boolean;
  onClose: () => void;
}