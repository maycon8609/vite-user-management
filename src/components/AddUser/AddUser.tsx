import { FC, FormEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { User } from "../../types";

interface AddUserProps {
  handleSaveChange: (user: Omit<User, "id">) => void;
  handleClose: () => void;
  isOpen: boolean;
}

export const AddUser: FC<AddUserProps> = ({
  handleClose,
  handleSaveChange,
  isOpen,
}) => {
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
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Adicionar usuario</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <>
            <TextField
              autoComplete="name"
              autoFocus
              fullWidth
              id="name"
              label="Nome"
              margin="dense"
              name="name"
              required
            />
            <TextField
              autoComplete="email"
              fullWidth
              id="email"
              label="E-mail"
              margin="dense"
              name="email"
              required
            />
            <TextField
              autoComplete="password"
              fullWidth
              id="password"
              label="Senha"
              margin="dense"
              name="password"
              type="password"
              required
            />
          </>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
