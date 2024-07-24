import type { User } from "@/types";
import { ChangeEvent } from "react";

export type EditProfileProps = {
  'data-testid'?: string
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSaveChanges: () => void
  onClose: () => void;
  user: User | null;
}