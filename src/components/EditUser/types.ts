import { User } from "@/global/types";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";

export type EditUserProps = {
  'data-testid'?: string
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void
  handleSaveChange: () => void
  onClose: () => void;
  user: User | null;
}