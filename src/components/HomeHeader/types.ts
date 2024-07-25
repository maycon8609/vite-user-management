import { User } from "@/global/types";

export type HomeHeaderProps = {
  user: User | null;
  handleAddUser: () => void;
  handleEditProfile: () => void;
}