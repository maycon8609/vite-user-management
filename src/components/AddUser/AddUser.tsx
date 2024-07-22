import { FormEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { User } from "../../contexts";

interface AddUserProps {
  handleSaveChange: (user: Omit<User, "id">) => void;
  handleClose: () => void;
  isOpen: boolean;
}

export const AddUser = ({
  handleClose,
  handleSaveChange,
  isOpen,
}: AddUserProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const newUser = {
      name,
      email,
      password,
    };
    handleSaveChange(newUser);
    handleClose()
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add user</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <>
            <TextField
              autoComplete="name"
              autoFocus
              fullWidth
              id="name"
              label="Name"
              margin="dense"
              name="name"
              required
            />
            <TextField
              autoComplete="email"
              fullWidth
              id="email"
              label="Email"
              margin="dense"
              name="email"
              required
            />
            <TextField
              autoComplete="password"
              fullWidth
              id="password"
              label="Password"
              margin="dense"
              name="password"
              type="password"
              required
            />
          </>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
