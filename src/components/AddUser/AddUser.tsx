import { FC, FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useUserManagement } from "../../hooks";

interface AddUserProps {
  onClose: () => void;
  isOpen: boolean;
}

export const AddUser: FC<AddUserProps> = ({ onClose, isOpen }) => {
  const [error, setError] = useState<string | null>(null);

  const { createUser } = useUserManagement();

  const onCloseDialog = () => {
    setError(null);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const type = data.get("type") as "ADMIN" | "USER";

    const newUser = {
      name,
      email,
      password,
      type,
    };

    const response = createUser(newUser);

    if (response) {
      setError(response.errorMessage);
    } else {
      onCloseDialog();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseDialog}>
      <DialogTitle>Adicionar usuario</DialogTitle>

      {error && (
        <Alert severity="error" sx={{ m: 3, mt: 0, mb: 0 }}>
          {error}
        </Alert>
      )}

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

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="select-label">Tipo</InputLabel>
              <Select
                id="select"
                label="Tipo"
                labelId="select-label"
                name="type"
                defaultValue="USER"
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
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
