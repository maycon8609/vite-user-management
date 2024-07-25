import { User } from "@/global/types";

export type HomeHeaderProps = {
  'data-testid'?: string
  handleAddUser: () => void;
  handleEditProfile: () => void;
  user: User | null;
}